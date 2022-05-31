import './App.css';
import { useEffect, useState, useRef } from 'react'

function App() {

  const input = useRef(null)
  const [page, setPage] = useState('🏠 Home')
  const [time, setTime] = useState(null)
  const [resolution, setResolution] = useState()
  const [inputValue, setInputValue] = useState()
  const [pastCommandsIndex, setPastCommandsIndex] = useState(-1)
  const [pastCommands, setPastCommands] = useState([])
  const [output, setOutput] = useState([])

  const getTime = () => {
    let a = Date().toString().split(' ')
    a.splice(3, 1)
    a.splice(4, a.length)
    return a.join(' ')
  }

  useEffect(() => {
    setTime(getTime())
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      setResolution(`${(window.innerWidth / 14).toFixed()} x ${(window.innerHeight / 14).toFixed()}`)
    }
    setResolution(`${(window.innerWidth / 14).toFixed()} x ${(window.innerHeight / 14).toFixed()}`)
    window.addEventListener('resize', handleResize)
  }, [])
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      // if enter
      e.preventDefault();
      console.log(e.target.value)
      if (e.target.value == "") {

        return setOutput([...output, `awesome-person@my-website ~ %`])
      } else if (!commands[e.target.value]) {
        setOutput([...output, `zsh: command not found: ${e.target.value}`])

      } else {
        commands[e.target.value].execute()
      }
      setPastCommandsIndex(pastCommands.length + 1)
      setPastCommands([...pastCommands, e.target.value])
      setInputValue("")
    }
    if (e.keyCode === 38) {
      if (pastCommandsIndex == 0) {
        return
      }
      setPastCommandsIndex(pastCommandsIndex - 1)
      setInputValue(pastCommands[pastCommandsIndex - 1])

    }
    if (e.keyCode === 40) {
      if (pastCommandsIndex == pastCommands.length - 1) {
        return setInputValue("")
      }
      setInputValue(pastCommands[pastCommandsIndex + 1])
      setPastCommandsIndex(pastCommandsIndex + 1)
    }
  }

  const commands = {
    clear: {
      execute: () => setOutput([])
    },
    help: {
      execute: () => setOutput([...output,
      <></>,
      <>clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clear the terminal window</>,
      <>help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Find commands to run</>,
      <></>,
      ])
    }
  }

  return [
    <div className="terminal" onClick={() => input.current.focus()}>
      <div className="terminal-title">
        <div className="terminal-title-actions">
          <div className="action" style={{ backgroundColor: "#ff5e57" }}></div>
          <div className="action" style={{ backgroundColor: "#febc2e" }}></div>
          <div className="action" style={{ backgroundColor: "#2bc740" }}></div>
        </div>
        <div className="title-text">
          {page} ― -zsh ― {resolution}
        </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-input">awesome-person@my-website ~ % {inputValue}</div>
        <div className="terminal-output">
          Last login: {time} on ttys000<br></br>
          {output.map(e => [e, <br></br>])}
        </div>
      </div>
    </div>,
    <input ref={input} autoFocus type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />,
  ];
}

export default App;
