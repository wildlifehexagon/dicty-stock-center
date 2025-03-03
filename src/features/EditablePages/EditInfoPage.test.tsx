import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter, useHistory } from "react-router-dom"
import { UpdateContentDocument } from "dicty-graphql-schema"
import EditInfoPage from "./EditInfoPage"
import { MockAuthProvider } from "common/utils/testing"

const mockHistoryPush = jest.fn()
const mockParamsName = "order"
// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: mockParamsName,
    }),
    useHistory: jest.fn(),
  }
})

window.getSelection = jest.fn()

const mockContent = {
  object: "value",
  document: {
    object: "document",
    data: {},
    nodes: [
      {
        object: "block",
        type: "paragraph",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Test Content",
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },
}

describe("features/EditablePages/EditInfoPage", () => {
  const props = {
    location: {
      state: {
        data: {
          id: "99",
          name: "payment",
          slug: "dsc-payment",
          content: JSON.stringify(mockContent),
          updated_at: "2020-01-01T17:50:12.427Z",
          updated_by: {
            id: "999",
            first_name: "Art",
            last_name: "Vandelay",
            email: "art@vandelayindustries.com",
            roles: [
              {
                role: "Latex Salesman",
              },
            ],
          },
        },
      },
    },
  }

  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks} validToken>
      <BrowserRouter>
        <EditInfoPage {...props} />
      </BrowserRouter>
    </MockAuthProvider>
  )

  describe("initial render", () => {
    it("renders expected page content", () => {
      render(<MockComponent mocks={[]} />)

      const content = screen.getByText(/Test Content/)
      expect(content).toBeInTheDocument()
    })
  })

  describe("button clicking", () => {
    it("saves content and redirects on click", async () => {
      const mocks = [
        {
          request: {
            query: UpdateContentDocument,
            variables: {
              input: {
                id: props.location.state.data.id,
                updated_by: props.location.state.data.updated_by.id,
                content: props.location.state.data.content,
              },
            },
          },
          result: {
            data: {
              updateContent: {
                id: props.location.state.data.id,
                updated_by: {
                  id: props.location.state.data.updated_by.id,
                },
                content: props.location.state.data.content,
              },
            },
          },
        },
      ]
      ;(useHistory as jest.Mock).mockReturnValueOnce({
        push: mockHistoryPush,
      })
      render(<MockComponent mocks={mocks} />)
      // there are two save buttons, one in toolbar and one at bottom
      const saveButtons = screen.getAllByText("Save")
      userEvent.click(saveButtons[0])
      await waitFor(
        () => {
          expect(mockHistoryPush).toHaveBeenCalledWith(
            `/information/${mockParamsName}`,
          )
        },
        { timeout: 2000 },
      )
    })

    it("should go back to previous URL on cancel", () => {
      ;(useHistory as jest.Mock).mockReturnValueOnce({
        push: mockHistoryPush,
      })
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      userEvent.click(cancelButton)
      expect(mockHistoryPush).toHaveBeenCalledWith(
        `/information/${mockParamsName}`,
      )
    })
  })
})
