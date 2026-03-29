import { createCliRenderer, TextareaRenderable } from "@opentui/core"
import { render, useKeyboard, useTerminalDimensions } from "@opentui/solid"
import { createSignal } from "solid-js"

function App() {
  const dims = useTerminalDimensions()
  const [submitted, setSubmitted] = createSignal("")

  useKeyboard((evt) => {
    if (evt.ctrl && evt.name === "c") process.exit(0)
  })

  return (
    <box
      width={dims().width}
      height={dims().height}
      flexDirection="column"
      justifyContent="flex-end"
    >
      <box flexDirection="column" padding={1} border={["top", "left", "right", "bottom"]}>
        <text>Type a message and press Enter to submit. Ctrl+C to exit.</text>
        {submitted() ? <text fg={{ r: 0, g: 200, b: 0, a: 255 }}>Submitted: {submitted()}</text> : <text />}
        <textarea
          ref={(r: TextareaRenderable) => {
            setTimeout(() => r?.focus(), 0)
          }}
          flexGrow={1}
          minHeight={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shift) {
              e.preventDefault()
              const ta = e.target as TextareaRenderable
              setSubmitted(ta.value)
              ta.value = ""
            }
          }}
        />
      </box>
    </box>
  )
}

const renderer = await createCliRenderer({
  targetFps: 60,
  gatherStats: false,
  exitOnCtrlC: true,
  autoFocus: false,
  openConsoleOnError: false,
})

await render(() => <App />, renderer)
