import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import "./dashboard.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAppSlice } from "../../store/slices/app-slice";
import { IAccountSlice } from "../../store/slices/account-slice";

function Dashboard() {
    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);

    const isAccountLoading = useSelector<IReduxState, boolean>(state => state.account.loading);
    const account = useSelector<IReduxState, IAccountSlice>(state => state.account);

    const myBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.apeu;
    });

    const limitTransferIn = useSelector<IReduxState, string>(state => {
        return state.account.limits && state.account.limits.transferIn;
    });

    const limitTransferOut = useSelector<IReduxState, string>(state => {
        return state.account.limits && state.account.limits.transferOut;
    });

    const limitSellOut = useSelector<IReduxState, string>(state => {
        return state.account.limits && state.account.limits.sellOut;
    });

    return (
        <div className="dashboard-view">
            <div className="dashboard-infos-wrap">
                <Zoom in={true}>
                    <Grid container spacing={4}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">10,000 NATR =</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : `0`} MIM</p>
                                <p className="card-title">${isAppLoading ? <Skeleton width="100px" /> : `0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Value Locked</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : `0 NATR`}</p>
                                <p className="card-title">{isAppLoading ? <Skeleton width="100px" /> : `$0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Forests</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : `0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Supply</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `0 NATR`}</p>
                                <p className="card-title">{isAppLoading ? <Skeleton width="100px" /> : `$0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Emission Per Day</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : `$0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Burned From Renaming</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="250px" /> : `0 NATR`}</p>
                                <p className="card-title">{isAppLoading ? <Skeleton width="100px" /> : `$0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">My Forests</p>
                                <p className="card-value">{isAccountLoading ? <Skeleton width="100px" /> : `0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Estimated Per Day</p>
                                <p className="card-value">{isAppLoading ? <Skeleton width="100px" /> : `$0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Total Pending Reward</p>
                                <p className="card-value">{isAccountLoading ? <Skeleton width="250px" /> : `0 NATR`}</p>
                                <p className="card-title">{isAppLoading ? <Skeleton width="100px" /> : `$0`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Incoming Transfers & Buys Remaining</p>
                                <p className="card-value">{isAccountLoading ? <Skeleton width="100px" /> : `0 NATR`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Sells Remaining</p>
                                <p className="card-value">{isAccountLoading ? <Skeleton width="100px" /> : `0 NATR`}</p>
                            </div>
                        </Grid>

                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <div className="dashboard-card">
                                <p className="card-title">Outgoing Transfers Remaining</p>
                                <p className="card-value">{isAccountLoading ? <Skeleton width="100px" /> : `0 NATR`}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Zoom>
            </div>
        </div>
    );
}

export default Dashboard;
