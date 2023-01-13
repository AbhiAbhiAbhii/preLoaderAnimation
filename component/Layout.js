import PreLoader from "./PreLoader";
import Main from './Main'
const Layout = () => {
    return(
            <div>
                <PreLoader />
                <Main />
                { children }
            </div>
    )
}

export default Layout;