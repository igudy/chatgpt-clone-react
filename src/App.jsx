import { useState, useEffect } from "react"

const App = () => {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }

    try {
      const response = await fetch("http://localhost:8000/completions", options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(
        (prevChats) => (
          [...prevChats],
          {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          }
        )
      )
    }
  }, [message, currentTitle])

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          <li>BLURGH</li>
        </ul>
        <nav>
          <p>Made by Igudy</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>IgudyGPT</h1>}
        <ul className="feed">{}</ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              Send
            </div>
          </div>
          <p className="info">
            Chat GPT Mar 14 Version. Free Research Preview. Our goal is to make
            AI systems more natural and safe to interact with. Your feedback
            will help us improve.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
