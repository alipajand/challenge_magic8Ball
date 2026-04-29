import { useMagic8Ball } from "./hooks/useMagic8Ball"
import styles from "./Magic8Ball.module.css"

export const Magic8Ball = () => {
    const { selectors: { email, status, errorMessage, answerText },
        actions: {
            handleEmailChange,
            handleShakeClick
        } } = useMagic8Ball()

    return <div className={styles.container}>
        <h1 className={styles.title}>Magic 8-Ball - Ask a Question</h1>
        <form onSubmit={handleShakeClick} className={styles.field}>
            <label className={styles.label} htmlFor="email">
                Email
            </label>
            <div className={styles.inputRow}>
                <input
                    id="email"
                    placeholder="test@example.com"
                    className={styles.input}
                    value={email} onChange={handleEmailChange}
                    data-testid="email-input"
                    type="email"
                />
                <button
                    type="submit"
                    className={styles.button}
                    data-testid="shake-button"
                    disabled={status === 'Loading'}
                >
                    Shake 🎱
                </button>
            </div>
        </form>

        <div className={styles.meta}>
            <div className={styles.statusRow}>
                <span className={styles.label}>Status:</span>
                <span data-testid="shake-status">{status}</span>
                <span className={styles.error} data-testid="error-message">{errorMessage}</span>
            </div>

            <div className={styles.answerRow} data-testid="answer-display">
                {answerText ? <span className={styles.label}>Answer:</span> : null}
                <span className={styles.mono} data-testid="answer-text">{answerText}</span>
            </div>
        </div>
    </div>
}

