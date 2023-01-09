import logo from './logo.svg';
import './App.css';
import {
	useState
} from 'react';


function App() {

	let [data, b] = useState(['data1', 'data2', 'data3']);
	let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);

	return ( <
		div className = "App" >

		<
		div > {
			data[0]
		} < /div> <
		div > {
			data[1]
		} < /div> <
		div > {
			data[2]
		} < /div>

		<
		div > {
			글제목[0]
		} < /div> <
		div > {
			글제목[1]
		} < /div> <
		div > {
			글제목[2]
		} < /div>

		{
			/* <button onClick={() => { 글제목 }}> 수정버튼 </button> */ }

		<
		button onClick = {
			() => {
				let copy = [...글제목]
				copy[0] = '여자코트 추천';
				글제목변경(copy)
			}
		} > 수정버튼 < /button>


		{
			/* <header className="App-header">
			        <img src={logo} className="App-logo" alt="logo" />
			        <p>
			          Edit <code>src/App.js</code> and save to reload.
			        </p>
			        <a
			          className="App-link"
			          href="https://reactjs.org"
			          target="_blank"
			          rel="noopener noreferrer"
			        >
			          Learn React
			        </a>
			      </header> */
		} <
		/div>
	);
}

export default App;