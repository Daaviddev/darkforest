import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../../../store/slices/state.interface";
import { IPendingTxn } from "../../../../store/slices/pending-txns-slice";
import { useWeb3Context } from "../../../../hooks";
import { createPlanet, compoundAll, claimAll, compoundReward, cashoutReward } from "../../../../store/slices/planet-thunk";
import "./planet-button.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import TxModal from "../../TxModal";

interface IPlanetButtonProps {
    action: string;
    planetId: string;
    actionTime: number;
}

function PlanetButton({ action, planetId, actionTime }: IPlanetButtonProps) {
    const [open, setOpen] = useState(false);
    const { provider, address, chainID, checkWrongNetwork } = useWeb3Context();
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onCompoundAll = async () => {
        if (await checkWrongNetwork()) return;
        dispatch(compoundAll({ provider, address, networkID: chainID }));
    };

    const onClaimAll = async () => {
        if (await checkWrongNetwork()) return;
        dispatch(claimAll({ provider, address, networkID: chainID }));
    };

    const onCompoundReward = async () => {
        if (await checkWrongNetwork()) return;
        dispatch(compoundReward({ planetId, provider, address, networkID: chainID }));
    };

    const onClaimReward = async () => {
        if (await checkWrongNetwork()) return;
        dispatch(cashoutReward({ planetId, provider, address, networkID: chainID }));
    };

    const calculateTimeLeft = () => {
        const timeLeftStamp = actionTime - Math.floor(Date.now() / 1000);
        if (timeLeftStamp <= 0) return 0;
        return timeLeftStamp;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        let timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    let timerComponent;

    let buttonText = "";
    let className = "planet-button";
    let clickFunc = () => {};
    let filter = "";

    if (action == "create") {
        buttonText = "New Forest";
        clickFunc = () => {};
        filter = action;
    } else if (action == "rename") {
        buttonText = "Rename";
        clickFunc = () => {
            handleOpen();
        };
        filter = action;
    } else if (action == "transfer") {
        buttonText = "Transfer";
        clickFunc = () => {
            handleOpen();
        };
        filter = action;
    } else if (action == "compound") {
        buttonText = timeLeft == 0 ? "Compound" : new Date(timeLeft * 1000).toISOString().substring(11, 19);
        timerComponent = <p>{buttonText}</p>;
        className = timeLeft == 0 ? "planet-button" : "planet-button disabled card-disabled";
        clickFunc = () => {
            onCompoundReward();
        };
    } else if (action == "claim") {
        buttonText = timeLeft == 0 ? "Claim" : new Date(timeLeft * 1000).toISOString().substring(11, 19);
        className = timeLeft == 0 ? "planet-button" : "planet-button disabled card-disabled";
        clickFunc = () => {
            onClaimReward();
        };
    } else if (action == "compoundall") {
        buttonText = "Compound All";
        // buttonText = actionTime == "0" ? "Compound All" : actionTime;
        className = timeLeft == 0 ? "planet-button" : "planet-button disabled";
        clickFunc = () => {};
    } else if (action == "claimall") {
        buttonText = "Claim All";
        // buttonText = actionTime == "0" ? "Claim All" : actionTime;
        className = timeLeft == 0 ? "planet-button" : "planet-button disabled";
        clickFunc = () => {};
    }

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    if (pendingTransactions && pendingTransactions.length > 0) {
        buttonText = `${pendingTransactions.length} Tx Pending `;
        clickFunc = () => {};
    }

    return (
        <>
            <div className={className} onClick={clickFunc}>
                <p>{buttonText}</p>
                {pendingTransactions.length > 0 && (
                    <div className="planet-button-progress">
                        <CircularProgress size={15} color="inherit" />
                    </div>
                )}
            </div>
            <TxModal open={open} handleClose={handleClose} filter={filter} planetId={planetId} />
        </>
    );
}

export default PlanetButton;
