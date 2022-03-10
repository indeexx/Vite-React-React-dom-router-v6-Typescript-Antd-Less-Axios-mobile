import { history } from "../router/history";
import { Button } from "antd-mobile";
import { CheckOutline } from "antd-mobile-icons"
import styles from "./Home.module.less"

console.log("%c环境变量:", "color: blue; font-size: 20px;");
console.log(import.meta.env);

const Home = () => {
  const handleClick = () => {
    history.push("/about");
  }
  return <div className={styles.home}>
    <CheckOutline />
    <Button color="primary" onClick={handleClick}>跳转</Button>
    <div className={styles.div}>
      Hello Indeex</div>
  </div>
}
export default Home