import { useSelector } from "react-redux";
import { Grid, Zoom } from "@material-ui/core";
import { ReactComponent as seed } from "../../assets/apes/0.svg";
import { ReactComponent as plant } from "../../assets/apes/1.svg";
import { ReactComponent as bush } from "../../assets/apes/2.svg";
import { ReactComponent as tree } from "../../assets/apes/3.svg";
import { ReactComponent as forest } from "../../assets/apes/4.svg";
import { ReactComponent as jungle } from "../../assets/apes/5.svg";
import "./mint.scss";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IPlanetInfoDetails } from "../../store/slices/account-slice";
import ToolBar from "./ToolBar";
import DFCard from "./ApeCard";

function Mint() {
    const planets = useSelector<IReduxState, IPlanetInfoDetails[]>(state => {
        return state.account.planets;
    });

    return (
        <>
            {planets == undefined ? <></> : <ToolBar planets={planets} />}
            <div className="mint-view">
                <div className="mint-infos-wrap">
                    <Zoom in={true}>
                        <Grid container spacing={4}>
                            {planets == undefined ? (
                                <Skeleton width="100px" />
                            ) : (
                                planets.map(planet => (
                                    <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
                                        <DFCard planet={planet} />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Zoom>
                </div>
            </div>
        </>
    );
}

export default Mint;
