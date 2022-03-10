## Vite React React-dom-router V6 Typescript Antd-mobile Less Axios

### 模版创建

```javascript
# npm 6.x
npm init @vitejs/app vite-react-ts-antd-starter --template react-ts

# npm 7+, 注意--：
npm init @vitejs/app vite-react-ts-antd-starter -- --template react-ts
```

### 页面

新建pages文件夹，在文件夹下新建三个Home.tsx、About.tsx、NotFound.tsx文件：

Home.tsx:

```typescript
const Home = () => {
    return <div>
     home pages
    </div>
  }
  export default Home
```

About.tsx:

```typescript
const Home = () => {
    return <div>
     about pages
    </div>
  }
  export default Home
```

NotFound.tsx:

```typescript
const Home = () => {
    return <div>
     404 pages
    </div>
  }
  export default Home
```

### 安装路由V6

```javascript
npm i react-router-dom
```

由于改版本改动较大，所有使用详见文档 [reactrouter v6](https://reactrouter.com/docs/en/v6)

#### 路由拆分

新建router文件夹，在router文件夹下新建routes.ts:

```typescript
import Home from "./../pages/Home"
import About from "./../pages/About"
import NotFound from "./../pages/NotFound"

const Routes: any = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "about",
        element: About,
    },
    {
        path: "404",
        element: NotFound,
    },
]

export default Routes;
```

#### 自定义History

新建history.ts:

```typescript
import { createBrowserHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

export const history = createBrowserHistory();

interface IHistoryRouteProps {
    history: typeof history;
}

export const IHistoryRouter: React.FC<IHistoryRouteProps> = ({ history, children }) => {
    const [state, setState] = React.useState(
        {
            action: history.action,
            location: history.location
        }
    );
    React.useLayoutEffect(() => {
        history.listen(setState);
    }, [history]);
    return React.createElement(Router, Object.assign({ children, navigator: history }, state));
}
```

#### 使用路由

修改main.tsx:

```typescript
import React from 'react'
import ReactDOM from 'react-dom'
import { history, IHistoryRouter } from './router/history'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <IHistoryRouter history={history}>
      <App />
    </IHistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
```

修改App.tsx:

```typescript
import React from "react";
import { useRoutes } from 'react-router-dom';
import Routes from "./router/routes"

const App: React.FC = (): JSX.Element => {
  let routes: any = [];
  Routes.forEach((route: any, index: number) => {
    const Ele = route.element;
    const router = {
      path: route.path,
      element: <Ele />,
    };
    routes.push(router);
  });
  const router = useRoutes([...routes]);
  return <>{router}</>;
};
export default App;
```

### Less

```javascript
npm i less -D
```

### Ant Design UI

安装antd:

```javascript
npm i antd-mobile
```

安装antd icon:

```javascript
npm install -S antd-mobile-icons
```

按需引入：

```javascript
npm i vite-plugin-imp -D
```

#### 配置antd插件和CSS Modules

详细配置信息，见[vite配置文档](https://vitejs.dev/config)

修改vite.config.ts:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from "vite-plugin-imp"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp(
      {
        optimize: true,
        libList: [
          {//antd
            libName: "antd-mobile",
            libDirectory: "es",
            style: (name) => `antd/es/${name}/style`,
          }
        ],
      },
    ),
  ],
  css: {
      modules: {//css modules
      localsConvention: "camelCaseOnly",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  }
})
```

### proxy代理

配置完css Modules后，在下面直接配置代理：

```javascript
//...
server: {
    proxy: {
      "/api/": {
        target: "/",
        changeOrigin: true,
      }
    }
  }
  //...
```

### alias别名

安装typescript版本的node：

```typescript
npm i @types/node -D
```

接着直接根据vite文档配置：

```typescript
//  ...
import path from 'path'
//...
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  //...
```

然后配置tsconfig中的compilerOptions:

```javascript
//...
"paths": {
      "@/*": ["./src/*"]
    }
//...
```

然后在Home.tsx中测试以上配置：

```typescript
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
```

Home.module.less:

```less
.Home{
    background-color: blueviolet;
    .div{
        background-color: lightcoral;
    }
}
```

### 移动端适配

```javascript
npm i -D postcss-pxtorem
```

修改vite.config:

```javascript
plugins: [
    react(),
    vitePluginImp(
      {
        optimize: true,
        libList: [
          {//antd-mobile
            libName: 'antd-mobile',
            style: (name) => `antd-mobile/es/${name}/style/css.js`
          }
        ],
      },
    ),
  ],
```

根目录新建postcss.config.js:

```javascript
module.exports = {
    "plugins": {
        "postcss-pxtorem": {
            rootValue: 37.5,//对应375稿
            propList: ["*"],
            selectorBlackList: [".norem"]
        }
    }
}
```

在src目录下新建utils文件夹，在utiles文件夹下新建rem.js:


*此步骤可直接使用 npm i -S lib-flexible*

```javascript
;
(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        //此处以适配范围为1920---5760为例
        if (width / dpr < 1920) {
            width = 1920 * dpr;
        } else if (width / dpr > 5760) {
            width = 5760 * dpr;
        }
        var rem = width / 19.2; //使用时1rem=100px
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }


    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));
```

然后在main.ts中引入:

```typescript
//...
import "@/utils/rem";
//...
```

修改Home.module.less文件检测效果：

```css
.Home{
    width: 100%;
    background-color: blueviolet;
    .div{
        width: 375px;
        background-color: lightcoral;
    }
}
```

### axios请求

```javascript
npm i -S axios
```

可直接在需要的地方引入，也可以自行封装

### 环境变量

根目录新增.env文件：

```javascript
NODE_ENV=development
VITE_APP_NAME=dev-indeex
```

和和.env.prod文件：

```javascript
NODE_ENV=production
VITE_APP_NAME=prod-indeex
```

以修改环境变量名，修改后在src下新增env.d.ts:

```typescript
interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
```

然后重启npm或yarn，通过：

```typescript
console.log(import.meta.env.VITE_APP_NAME);
```

获取自定义的环境名，也可以不修改环境变量名，使用默认的。


以上就可以使用在移动端，如果需要PC端，需要更换antd-mobile UI库并去掉移动端CSS配置。