import { connect } from "react-redux"
import Dashboard from "../../components/dashboard/Dashboard"
import { createClaimAndNavigateToChat } from "../../services/Insurance"
import { insuranceActions, chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    categories: state.insurance.categories,
    currentTotalPrice: state.insurance.currentTotalPrice,
    newTotalPrice: state.insurance.newTotalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
    checkout: () =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: "POST",
          url: "/checkout",
          body: null,
          SUCCESS: "INITIATE_CHECKOUT"
        })
      ),
    dispatch
  }
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
)

export default DashboardContainer
