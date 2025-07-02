import React, { useState, useContext, useRef, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext)
  const [curState, setCurState] = useState("Sign Up")
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    popupRef.current && popupRef.current.focus()
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowLogin(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [setShowLogin])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const onLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(data.email)) {
      toast.error("Please enter a valid email address.")
      return
    }
    setLoading(true)
    let newUrl = url
    if (curState === "Sign Up") {
      newUrl += "/api/user/register"
    } else {
      newUrl += "/api/user/login"
    }
    try {
      const response = await axios.post(newUrl, data)
      if (curState === "Sign Up") {
        toast.success("Account created successfully! Please log in.")
        setCurState("Log In")
      } else {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
        window.location.reload()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    }
    setLoading(false)
  }

  return (
    <div className='login-popup' tabIndex={-1}>
      <form
        onSubmit={onLogin}
        className="login-popup-container"
        aria-modal="true"
        aria-labelledby="login-popup-title"
        ref={popupRef}
      >
        <div className="login-popup-title">
          <h2 id="login-popup-title">{curState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            tabIndex={0}
            role="button"
            aria-label="Close login popup"
            onKeyDown={e => e.key === "Enter" && setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Log In" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Your Name'
              required
              autoFocus
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your Email'
            required
          />
          <div className="login-popup-password">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={showPass ? "text" : "password"}
              placeholder='Password'
              required
              minLength={6}
            />
            <span
              className="login-popup-showpass"
              onClick={() => setShowPass(v => !v)}
              tabIndex={0}
              aria-label={showPass ? "Hide password" : "Show password"}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && setShowPass(v => !v)}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <button
          type='submit'
          className='btn'
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? <Loader text="Processing..." /> : (curState === "Sign Up" ? "Create Account" : "Log In")}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required id="terms" />
          <label htmlFor="terms">
            By continuing, I agree to the <a href="https://www.247waiter.com/terms-and-conditions/" target="_blank" rel="noopener noreferrer">terms</a> &amp; <a href="https://faceprep.in/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
          </label>
        </div>
        {curState === "Log In"
          ? <p> Create a new account? <span onClick={() => setCurState("Sign Up")}>Click here</span></p>
          : <p> Already have an account? <span onClick={() => setCurState("Log In")}>Log In here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
