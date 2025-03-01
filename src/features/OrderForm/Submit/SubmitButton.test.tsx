import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SubmitButton, { getIDs, getUserVariables } from "./SubmitButton"
import {
  CreateOrderDocument,
  CreateUserDocument,
  UpdateUserDocument,
  UserByEmailDocument,
} from "dicty-graphql-schema"
import { MockCartProvider } from "common/utils/testing"
import useCartItems from "common/hooks/useCartItems"
import { fees } from "common/constants/fees"
import { CartItem } from "common/types"
import mockValues from "../utils/mockValues"

// set up all of our mocks
const mockHistoryPush = jest.fn()
jest.mock("common/hooks/useCartItems")
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")

  return {
    ...originalModule,
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }
})

const mockedUseCartItems = useCartItems as jest.Mock
mockedUseCartItems.mockReturnValue({
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  emptyCart: jest.fn(),
  getCartTotal: jest.fn(),
})

let addedItems = [] as Array<CartItem>
addedItems.fill(
  {
    id: "DBS1234",
    name: "test strain",
    summary: "this is a test strain",
    fee: fees.STRAIN_FEE,
  },
  0,
  10,
)

const createConsumerVariables = {
  input: {
    first_name: mockValues.firstName,
    last_name: mockValues.lastName,
    email: mockValues.email,
    organization: mockValues.organization,
    group_name: mockValues.lab,
    first_address: mockValues.address1,
    second_address: mockValues.address2,
    city: mockValues.city,
    state: mockValues.state,
    zipcode: mockValues.zip,
    country: mockValues.country,
    phone: mockValues.phone,
    is_active: true,
  },
}

const updateConsumerVariables = {
  id: "999",
  input: {
    first_name: mockValues.firstName,
    last_name: mockValues.lastName,
    organization: mockValues.organization,
    group_name: mockValues.lab,
    first_address: mockValues.address1,
    second_address: mockValues.address2,
    city: mockValues.city,
    state: mockValues.state,
    zipcode: mockValues.zip,
    country: mockValues.country,
    phone: mockValues.phone,
    is_active: true,
  },
}

const updatePayerVariables = {
  id: "999",
  input: {
    first_name: mockValues.payerFirstName,
    last_name: mockValues.payerLastName,
    organization: mockValues.payerOrganization,
    group_name: mockValues.payerLab,
    first_address: mockValues.payerAddress1,
    second_address: mockValues.payerAddress2,
    city: mockValues.payerCity,
    state: mockValues.payerState,
    zipcode: mockValues.payerZip,
    country: mockValues.payerCountry,
    phone: mockValues.payerPhone,
    is_active: true,
  },
}

const createOrderVariables = {
  input: {
    courier: mockValues.shippingAccount,
    courier_account: mockValues.shippingAccountNumber,
    comments: mockValues.comments,
    payment: mockValues.paymentMethod,
    purchase_order_num: mockValues.purchaseOrderNum,
    status: "IN_PREPARATION",
    consumer: mockValues.email,
    payer: mockValues.payerEmail,
    purchaser: mockValues.email,
    items: addedItems.map((item) => item.id),
  },
}

const mockSetSubmitError = jest.fn()

describe("features/OrderForm/SubmitButton", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("order submission with existing user", () => {
    const mocks = [
      {
        request: {
          query: UserByEmailDocument,
          variables: {
            email: mockValues.email,
          },
        },
        result: {
          data: {
            userByEmail: {
              id: "999",
            },
          },
        },
      },
      {
        request: {
          query: UpdateUserDocument,
          variables: updateConsumerVariables,
        },
        result: {
          data: {
            updateUser: {
              id: "999",
            },
          },
        },
      },
      {
        request: {
          query: UserByEmailDocument,
          variables: {
            email: mockValues.payerEmail,
          },
        },
        result: {
          data: {
            userByEmail: {
              id: "999",
            },
          },
        },
      },
      {
        request: {
          query: UpdateUserDocument,
          variables: updatePayerVariables,
        },
        result: {
          data: {
            updateUser: {
              id: "999",
            },
          },
        },
      },
      {
        request: {
          query: CreateOrderDocument,
          variables: createOrderVariables,
        },
        result: {
          data: {
            createOrder: {
              id: "123456",
            },
          },
        },
      },
    ]
    it("should process order when updating existing user", async () => {
      render(
        <MockCartProvider mocks={mocks} addedItems={addedItems}>
          <SubmitButton
            formData={mockValues}
            setSubmitError={mockSetSubmitError}
          />
        </MockCartProvider>,
      )
      const submitButton = screen.getByRole("button", { name: "Submit" })
      userEvent.click(submitButton)
      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(useCartItems).toHaveBeenCalled()
      })
    })
  })
  describe("order submission with nonexistent user", () => {
    const mocks = [
      {
        request: {
          query: UserByEmailDocument,
          variables: {
            email: mockValues.email,
          },
        },
        result: {
          errors: [
            {
              message: "could not find user",
              path: ["userByEmail"],
              extensions: { code: "NotFound" },
            },
          ],
        },
      },
      {
        request: {
          query: CreateUserDocument,
          variables: createConsumerVariables,
        },
        result: {
          data: {
            createUser: {
              id: "9991",
            },
          },
        },
      },
      {
        request: {
          query: UserByEmailDocument,
          variables: {
            email: mockValues.payerEmail,
          },
        },
        result: {
          data: {
            userByEmail: {
              id: "999",
            },
          },
        },
      },
      {
        request: {
          query: UpdateUserDocument,
          variables: updatePayerVariables,
        },
        result: {
          data: {
            updateUser: {
              id: "999",
            },
          },
        },
      },
      {
        request: {
          query: CreateOrderDocument,
          variables: createOrderVariables,
        },
        result: {
          data: {
            createOrder: {
              id: "123456",
            },
          },
        },
      },
    ]
    it("should process order when creating new user", async () => {
      render(
        //@ts-ignore
        <MockCartProvider mocks={mocks} addedItems={addedItems}>
          <SubmitButton
            formData={mockValues}
            setSubmitError={mockSetSubmitError}
          />
        </MockCartProvider>,
      )
      const submitButton = screen.getByRole("button", { name: "Submit" })
      userEvent.click(submitButton)
      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledTimes(1)
        expect(useCartItems).toHaveBeenCalled()
      })
    })
  })

  describe("order submission with unknown error fetching user", () => {
    const mocks = [
      {
        request: {
          query: UserByEmailDocument,
          variables: {
            email: mockValues.email,
          },
        },
        result: {
          errors: [
            {
              message: "unknown error",
              path: ["userByEmail"],
              extensions: { code: "Unknown" },
            },
          ],
        },
      },
    ]
    it("should not call functions designated for successful submit", async () => {
      render(
        //@ts-ignore
        <MockCartProvider mocks={mocks} addedItems={[]}>
          <SubmitButton
            formData={mockValues}
            setSubmitError={mockSetSubmitError}
          />
        </MockCartProvider>,
      )
      const submitButton = screen.getByRole("button", {
        name: "Submit",
      })
      userEvent.click(submitButton)
      await waitFor(() => {
        expect(mockHistoryPush).not.toHaveBeenCalled()
        expect(useCartItems).toHaveBeenCalled()
      })
    })
    it("should call setSubmitError if error fetching user", async () => {
      render(
        //@ts-ignore
        <MockCartProvider mocks={mocks} addedItems={[]}>
          <SubmitButton
            formData={mockValues}
            setSubmitError={mockSetSubmitError}
          />
        </MockCartProvider>,
      )
      const submitButton = screen.getByRole("button", {
        name: "Submit",
      })
      userEvent.click(submitButton)
      await waitFor(() => {
        expect(mockSetSubmitError).toHaveBeenCalled()
      })
    })
  })
})

describe("SubmitButton/getIDs", () => {
  it("should return array of IDs", () => {
    const items = [
      {
        id: "DBS123",
        name: "test",
        summary: "test summary",
        fee: fees.STRAIN_FEE,
      },
      {
        id: "DBS456",
        name: "test",
        summary: "test summary",
        fee: fees.STRAIN_FEE,
      },
    ]
    const ids = ["DBS123", "DBS456"]
    expect(getIDs(items)).toEqual(ids)
  })
})

describe("SubmitButton/getUserVariables", () => {
  it("should return id but no email if id is passed", () => {
    expect(getUserVariables(mockValues, "consumer", "999")).toStrictEqual({
      variables: {
        id: "999",
        input: {
          first_name: "Art",
          last_name: "Vandelay",
          organization: "Vandelay Industries",
          group_name: "Steinbrenner",
          first_address: "123 Main St",
          second_address: "",
          city: "New York City",
          state: "NY",
          zipcode: "10001",
          country: "USA",
          phone: "123-456-7890",
          is_active: true,
        },
      },
    })
  })
  it("should include email if no id passed", () => {
    expect(getUserVariables(mockValues, "consumer")).toStrictEqual({
      variables: {
        input: {
          first_name: "Art",
          last_name: "Vandelay",
          email: "art@vandelayindustries.com",
          organization: "Vandelay Industries",
          group_name: "Steinbrenner",
          first_address: "123 Main St",
          second_address: "",
          city: "New York City",
          state: "NY",
          zipcode: "10001",
          country: "USA",
          phone: "123-456-7890",
          is_active: true,
        },
      },
    })
  })
})
