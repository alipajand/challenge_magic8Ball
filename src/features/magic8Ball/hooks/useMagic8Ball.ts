import {
    useEffect,
    useRef,
    useState,
    type ChangeEventHandler,
    type FormEventHandler,
} from "react";
import { fetchSecret } from '../../../services/secret'

export type Magic8BallStatus = "Idle" | "Loading" | "Error" | "Done"

export interface Magic8BallSelectors {
    email: string
    status: Magic8BallStatus
    errorMessage: string
    answerText: string
}

export interface Magic8BallActions {
    handleEmailChange: ChangeEventHandler<HTMLInputElement>
    handleShakeClick: FormEventHandler<HTMLFormElement>
}

export interface Magic8BallHook {
    selectors: Magic8BallSelectors
    actions: Magic8BallActions
}

type TypewriterTimer = ReturnType<typeof setInterval>

export function useMagic8Ball(): Magic8BallHook {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<Magic8BallStatus>('Idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [answerText, setAnswerText] = useState('')

    const typewriterTimerRef = useRef<TypewriterTimer | null>(null)

    const clearTypewriterTimer = () => {
        if (typewriterTimerRef.current) {
            clearInterval(typewriterTimerRef.current)
            typewriterTimerRef.current = null
        }
    }

    const startTypewriter = (secret: string) => {
        clearTypewriterTimer()

        let idx = 0
        const delayMs = 80

        typewriterTimerRef.current = setInterval(() => {
            idx += 1
            setAnswerText(secret.slice(0, idx))

            if (idx >= secret.length) {
                clearTypewriterTimer()
            }
        }, delayMs)
    }


    const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value)
    }

    const onShake = async (email: string) => {
        try {
            const secret = await fetchSecret({
                email,
            })

            setStatus('Done')
            startTypewriter(secret)
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Unknown error'
            setStatus('Error')
            setErrorMessage(message)
        }
    }

    const handleShakeClick: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        if (status === 'Loading') {
            return
        }

        const trimmedEmail = email.trim()
        if (!trimmedEmail) {
            clearTypewriterTimer()
            setAnswerText('')
            setErrorMessage('Please enter your email.')
            setStatus('Error')
            return
        }

        clearTypewriterTimer()
        setErrorMessage('')
        setAnswerText('')
        setStatus('Loading')

        void onShake(trimmedEmail)
    }

    useEffect(() => {
        return () => {
            if (typewriterTimerRef.current) {
                clearInterval(typewriterTimerRef.current)
                typewriterTimerRef.current = null
            }
        }
    }, [])

    return {
        selectors: {
            email,
            status,
            errorMessage,
            answerText
        },
        actions: {
            handleEmailChange,
            handleShakeClick
        }
    }
}
