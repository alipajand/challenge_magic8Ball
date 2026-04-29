# Bettermode Assignment - Ali Pajand

Welcome to your Bettermode frontend coding assignment!

> **⚠️ IMPORTANT: You must use GitHub Codespaces for this assignment**
> This assignment requires the GitHub Codespaces environment. Cloning this repository to your local machine is not supported and will not work as expected.

## Quick Start

1. **Create your working branch**
   - Create a branch called `assignment`
   - All your work should be done on this branch

2. **Open this repository in a Codespace**
   - Click the "Code" button above
   - Select "Codespaces" tab
   - Create codespace on the `assignment` branch
   - Wait for the environment to initialize (~2 minutes, dependencies install automatically)

   **💡 Prefer using your local VSCode editor?** You can connect it to your codespace:
   - Install the [GitHub Codespaces extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) in VSCode
   - Open the Command Palette (Cmd/Ctrl+Shift+P)
   - Run "Codespaces: Connect to Codespace"
   - Select your codespace from the list
   - You'll have the full codespace environment with your local editor!

3. **Start the development server**
   ```bash
   npm run dev
   ```
   - The dev server will start on port 5173
   - Your browser will automatically open to show the application. If it doesn't, close the dev server and start again.

4. **Complete the assignment** (see requirements below)

5. **Submit your work** (see submission section below)

---

## Assignment Overview

Build a simple **Magic 8-Ball** web application. Users enter their email and shake the 8-ball to receive cryptic answers to their questions.

### What You'll Build

```
┌─────────────────────────────────────┐
│  Magic 8-Ball - Ask a Question      │
├─────────────────────────────────────┤
│                                     │
│  Email: [________________]          │
│                                     │
│  ┌───────────────┐                  │
│  │     Shake     │                  │
│  └───────────────┘                  │
│                                     │
│  Status: Loading...                 │
│                                     │
│  Answer: Q...                       │
│          QU...                      │
│          QUANTUM-PICKLE             │
│                                     │
└─────────────────────────────────────┘
```

The Magic 8-Ball provides personalized cryptic answers that appear with a typewriter effect.

---

## Assignment Requirements

### UI Requirements

Your page must include:

- An input field labeled **"Email"**
  - The field may be **pre-populated** for convenience
  - The field **must remain editable**
- A button labeled **"Shake 🎱"**
- A visible **status indicator** showing:
  - Idle
  - Loading
  - Error
  - Done
- A labeled display area: **"Answer:"**

---

### Shake Behavior

When **"Shake 🎱"** is clicked, make a POST request to:

```
/api/secret
```

Include these headers:

- `X-Assignment-Code: barcelona`
- `X-Candidate: <email entered in the UI>`
- `Accept: application/json`

The response will be JSON:

**Success:**
```json
{ "secret": "QUANTUM-PICKLE" }
```

**Error:**
```json
{ "error": "Error message here" }
```

The secret (answer) format is always two words joined by a hyphen (e.g., `WORD-WORD`).

---

### Display Behavior

- Show a **loading state** while the request is in progress
- Show an **error state** if the request fails
- When the request succeeds, display the answer using a **typewriter effect** that reveals characters progressively (approximately 60–120ms per character)

---

## Test Attributes

All 6 required `data-testid` attributes:

| # | `data-testid` | Element Type | Purpose |
|---|---------------|--------------|---------|
| 1 | `email-input` | `<input>` | Email text field |
| 2 | `shake-button` | `<button>` | "Shake" button |
| 3 | `shake-status` | `<div>` or `<span>` | Shows: Idle, Loading, Done, Error |
| 4 | `error-message` | `<div>` or `<span>` | Error text (hidden when no error) |
| 5 | `answer-display` | `<div>` | Container for answer |
| 6 | `answer-text` | `<span>` or `<div>` | The actual answer text |

---

### Important Behavior Requirement

Your solution must work correctly when the user changes the email or clicks **"Shake"** multiple times in succession.

---

## Constraints

- [Use GitHub Codespace](#quick-start)
- Do not use typewriter or animation libraries
- Do not use AI

---

## Submission

When you're ready to submit:

1. **Ensure all your changes are committed and pushed** to your `assignment` branch
2. **Create a Draft Pull Request** from `assignment` to `main`
3. **Mark the PR as "Ready for review"**

**⚠️ Important Warning:**

Once you mark your PR as "Ready for review", your access to this repository will be **automatically revoked**. The submission process will begin immediately and cannot be undone.

_If you accidentally created a non-draft PR, you can convert it into draft and click "Ready for review"._

Make sure:
- ✅ Your code works as expected
- ✅ All 6 test attributes are present
- ✅ Typewriter effect works smoothly
- ✅ All changes are committed and pushed
- ✅ You've tested the functionality
- ✅ You're completely finished

---

## Getting Help

If you encounter technical issues with the Codespace environment (not the assignment itself), please contact your hiring coordinator.

---

Good luck! 🚀
