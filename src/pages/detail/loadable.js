import React from 'react';
import Loadable from 'react-loadable';
// import Loading from './my-loading-component';
import './styles.css';
const LoadableComponent = Loadable({
  loader: () => import('./'),
//   loading: Loading,
  delay: 3000,
  loading(){
      return  <div class="ele-container">
              <div class="ele-wrapper">
              <div class="ele-tail"></div>
              <div class="ele-body">
                <div class="ele-head">
                <div class="ele-eyebrows"></div>
                <div class="ele-eyes"></div>
                <div class="ele-mouth"></div>
                <div class="ele-fang-front"></div>
                <div class="ele-fang-back"></div>
                <div class="ele-ear"></div>
                </div>
              </div>
              <div class="ele-leg-1 ele-leg-back">
                <div class="ele-foot"></div>
              </div>
              <div class="ele-leg-2 ele-leg-front">
                <div class="ele-foot"></div>
              </div>
              <div class="ele-leg-3 ele-leg-back">
                <div class="ele-foot"></div>
              </div>
              <div class="ele-leg-4 ele-leg-front">
                <div class="ele-foot"></div>
              </div>
              </div>
            </div>
  }
  
});
export default () => <LoadableComponent/>

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>;
//   }
// }