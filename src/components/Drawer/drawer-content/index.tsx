import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./social";
import StakeIcon from "../../../assets/icons/stake.svg";
import MintIcon from "../../../assets/icons/mint.svg";
import DFIcon from "../../../assets/icons/dflogo.png";
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import { trim, shorten } from "../../../helpers";
import { useAddress } from "../../../hooks";
import { Link } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./drawer-content.scss";
import classnames from "classnames";

function NavContent() {
    const [isActive] = useState();
    const address = useAddress();

    const checkPage = useCallback((location: any, page: string): boolean => {
        const currentPath = location.pathname.replace("/", "");
        if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
            return true;
        }
        if (currentPath.indexOf("mint") >= 0 && page === "mint") {
            return true;
        }
        return false;
    }, []);

    return (
        <div className="dapp-sidebar">
            <div className="branding-header">
                <Link href="" target="_blank">
                    <img alt="" src={DFIcon} />
                </Link>

                <div className="nav-title">
                    <p>Dark Forest</p>
                </div>

                {address && (
                    <div className="wallet-link">
                        <Link href={`https://cchain.explorer.avax.network/address/${address}`} target="_blank">
                            <p>{shorten(address)}</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="dapp-menu-links">
                <div className="dapp-nav">
                    <Link
                        component={NavLink}
                        to="/dashboard"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "dashboard");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={DashboardIcon} /> */}
                            <p>DASHBOARD</p>
                        </div>
                    </Link>

                    <Link
                        component={NavLink}
                        id="bond-nav"
                        to="/mint"
                        isActive={(match: any, location: any) => {
                            return checkPage(location, "mint");
                        }}
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={MintIcon} /> */}
                            <p>MY FORESTS</p>
                        </div>
                    </Link>

                    <Link
                        id="bond-nav"
                        href="https://dexscreener.com/avalanche/0xf98799477fc4e8887582431d7565eedea5750adb46"
                        target="_blank"
                        className={classnames("button-dapp-menu ", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={MintIcon} /> */}
                            <p>NATR CHART</p>
                        </div>
                    </Link>

                    <Link
                        id="bond-nav"
                        href="https://tofunft.com/collection/dark-forest-ecosystem/"
                        target="_blank"
                        className={classnames("button-dapp-menu", { active: isActive })}
                    >
                        <div className="dapp-menu-item">
                            {/* <img alt="" src={MintIcon} /> */}
                            <p>TOFU NFT</p>
                        </div>
                    </Link>

                    {/* <div className="bond-discounts">
                        <p>Mint discounts</p>
                        {bonds.map((bond, i) => (
                            <Link component={NavLink} to={`/mints/${bond.name}`} key={i} className={"bond"}>
                                {!bond.bondDiscount ? (
                                    <Skeleton variant="text" width={"150px"} />
                                ) : (
                                    <p>
                                        {bond.displayName}
                                        <span className="bond-pair-roi">{bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%</span>
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div> */}
                </div>
            </div>
            <div className="dapp-menu-doc-link"></div>
            <Social />
        </div>
    );
}

export default NavContent;
