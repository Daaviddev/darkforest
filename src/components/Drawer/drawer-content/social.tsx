import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../assets/icons/stake.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";
import { ReactComponent as CoinGecko } from "../../../assets/icons/coingecko.svg";
import { ReactComponent as CoinMarketCap } from "../../../assets/icons/coinmarketcap.svg";
import { ReactComponent as Chart } from "../../../assets/icons/chart.svg";
import KYCIcon from "../../../assets/icons/apekyc.png";

export default function Social() {
    return (
        <>
            <div className="social-row-1">
                <Link href="" target="_blank">
                    <SvgIcon color="primary" component={CoinGecko} />
                </Link>

                <Link href="" target="_blank">
                    <SvgIcon color="primary" component={CoinMarketCap} />
                </Link>

                <Link href="" target="_blank">
                    <SvgIcon color="primary" component={Chart} />
                </Link>
            </div>
            <div className="social-row-2">
                <Link href="https://nature-dao.gitbook.io/dark-forest-gitbook/" target="_blank">
                    <SvgIcon color="primary" component={GitHub} />
                </Link>

                <Link href="https://twitter.com/DarkforestNodes" target="_blank">
                    <SvgIcon color="primary" component={Twitter} />
                </Link>

                <Link href="" target="_blank">
                    <SvgIcon viewBox="0 0 32 32" color="primary" component={Telegram} />
                </Link>

                <Link href="" target="_blank">
                    <SvgIcon color="primary" component={Discord} />
                </Link>
            </div>
        </>
    );
}
