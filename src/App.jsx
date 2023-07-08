import { useState, useEffect } from "react"

const App = () => {
  const [value, setValue] = useState("")
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
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

      if (data.choices && data.choices.length > 0) {
        setMessage(data.choices[0].message)
      } else {
        setMessage(null) // Set message to null if choices array is empty or undefined
      }
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
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ])
    }
  }, [message, currentTitle])

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  )

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  )

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Igudy</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>IgudyGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
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
