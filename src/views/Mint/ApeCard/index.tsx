import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ReactComponent as seed } from "../../../assets/apes/0.svg";
import { ReactComponent as plant } from "../../../assets/apes/1.svg";
import { ReactComponent as bush } from "../../../assets/apes/2.svg";
import { ReactComponent as tree } from "../../../assets/apes/3.svg";
import { ReactComponent as forest } from "../../../assets/apes/4.svg";
import { ReactComponent as jungle } from "../../../assets/apes/5.svg";
import PlanetButton from "../ToolBar/planet-button";
import "./apecard.scss";
import { trim } from "../../../helpers";
import { IReduxState } from "../../../store/slices/state.interface";
import { IAccountSlice, IPlanetInfoDetails } from "../../../store/slices/account-slice";
import { IAppSlice } from "../../../store/slices/app-slice";

interface IDFCardProps {
    planet: IPlanetInfoDetails;
}

function DFCard({ planet }: IDFCardProps) {
    const tierImg = [seed, plant, bush, tree, forest, jungle];
    const tierLabel = ["Seed", "Plant", "Bush", "Tree", "Forest", "Jungle"];

    const mimPrice = useSelector<IReduxState, number>(state => state.app.mimPrice);
    const marketPrice = useSelector<IReduxState, number>(state => state.app.marketPrice);

    const getTierLevel = (reward: number) => {
        const amount = reward - 100000;
        if (amount === 0) return 0;
        else if (amount < 5000) return 1;
        else if (amount < 10000) return 2;
        else if (amount < 20000) return 3;
        else if (amount < 30000) return 4;
        else if (amount < 40000) return 5;
        else return 0;
    };

    const getBonus = (reward: number) => {
        return (reward - 100000) / 1000;
    };

    const getActionTime = () => {
        const actionTime = planet.lastProcessingTimestamp + planet.compoundDelay;
        // return actionTime == 0 ? "0" : new Date(actionTime * 1000).toISOString().substring(11, 19);
        return actionTime <= 0 ? 0 : actionTime;
    };

    const getTimeLeft = () => {
        const timestamp = getActionTime() - Math.floor(Date.now() / 1000);
        return timestamp <= 0 ? 0 : timestamp;
    };

    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    const className = timeLeft == 0 ? "dapp-topbar-btns-wrap" : "dapp-topbar-btns-wrap-full";

    return <div className=""></div>;
}

export default DFCard;
