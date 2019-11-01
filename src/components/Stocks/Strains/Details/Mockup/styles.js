import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
  },
  header: {
    textAlign: "center",
  },
  backButton: {
    textAlign: "left",
  },
  cardHeader: {
    backgroundColor: "#0059b3",
    color: "#fff",
  },
  cardBottom: {
    backgroundColor: "#0059b3",
    height: "5px",
  },
  leftCard: {},
  details: {
    // "&:hover": {
    //   boxShadow:
    //     "inset 1px 0 0 #dadce0,inset -1px 0 0 #dadce0,0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)",
    //   zIndex: 1,
    // },
    "&:nth-child(odd)": {
      backgroundColor: "#F4F6F8",
    },
  },
  list: {
    width: "100%",
    padding: "0px !important",
  },
  listTitle: {},
  listContent: {},
  rightCard: {
    padding: "5px",
    textAlign: "center",
  },
  quantity: {
    display: "inline-flex",
    justifyContent: "center",
  },
  textField: {},
  prevStrain: {
    color: "#fff !important",
  },
  nextStrain: {
    marginLeft: "auto !important",
    color: "#fff !important",
  },
  rightCardBottom: {
    marginTop: "10px",
  },
})

export default useStyles
