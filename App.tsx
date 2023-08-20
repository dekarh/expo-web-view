import * as React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { WebView } from "react-native-webview";
import { readAsStringAsync } from "expo-file-system";
import { useAssets } from "expo-asset";


const selectProgrammingLanguage = () => {
  const languages = [
    "Rust",
    "Python",
    "JavaScript",
    "TypeScript",
    "C++",
    "Go",
    "R",
    "Java",
    "PHP",
    "Kotlin",
  ];
  const randomInt = Math.floor(Math.random() * languages.length);
  return languages[randomInt];
};

export default class App extends React.Component {
  webref: any;

  constructor(props) {
    super(props);
    this.webref = React.createRef();     
  }

  render() {
    const [index, indexLoadingError] = useAssets(
      require("./stands/base/1.html")
    );
  
    const [html, setHtml] = React.useState("");
  
    if (index) {
      readAsStringAsync(index[0].localUri).then((data) => {
          setHtml(data);
      });
    }
    
    const runFirst = `
      window.ReactNativeWebView.postMessage("страница обновилась");       
      const docs_h1 = document.getElementsByTagName("h1");
      for (let doc of docs_h1) {doc.innerHTML = "qwe";}
      const docs_p = document.getElementsByTagName("p");
      for (let doc of docs_p) {doc.innerHTML = "ewq";};
      true; // примечание: это обязательно, иначе иногда будут возникать тихие сбои
    `;

    const runBeforeFirst = `
        window.isNativeApp = true;
        true; // примечание: это обязательно, иначе иногда будут возникать тихие сбои
    `;

    let counter = 1;

    const script = () => {
      const selectedLanguage = selectProgrammingLanguage();
      counter += 1;
      const newURL = "https://blog.logrocket.com";
      const redirectTo = 'window.location = "' + newURL + '"';

      if (counter <= 9) {
        return `
          if (document.body.style.backgroundColor === 'white') {
            document.body.style.backgroundColor = 'black'
            document.body.style.color = 'white'
          } else {
            document.body.style.backgroundColor = 'white'
            document.body.style.color = 'black'
          };

          document.getElementById("h2_element").innerHTML = "${selectedLanguage}?";
          window.ReactNativeWebView.postMessage("counter: ${counter}");
          true;  // примечание: это обязательно, иначе иногда будут возникать тихие сбои
      `;
      } else if (counter === 10) {             // Собщение в консоль и редирект
        return `
          window.ReactNativeWebView.postMessage("you are now getting redirected!"); 
          ${redirectTo};
          true;  // примечание: это обязательно, иначе иногда будут возникать тихие сбои
        `;
      } else {
        return null;
      }
    };
      
    setInterval(() => {
        this.webref.injectJavaScript(script()); // скрипт-иньекция исполняется раз в 2 сек
      }, 20000);
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          source={{ html }}
          ref={(r) => (this.webref = r)}        // для скрипта-инъекции раз в 2 сек
          onMessage={(event) => {
          console.log(event.nativeEvent.data);
          }}
          injectedJavaScript={runFirst}                           // 
          injectedJavaScriptBeforeContentLoaded={runBeforeFirst}  // 
        />
      </SafeAreaView>
    );
  }
}