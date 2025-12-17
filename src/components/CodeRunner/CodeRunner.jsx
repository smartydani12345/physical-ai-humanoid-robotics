import React, { useState } from 'react';
import styles from './CodeRunner.module.css';

const CodeRunner = ({ code, language = 'python', title = 'Code Example' }) => {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    // Simulate code execution - in a real implementation, this would connect to a backend service
    setTimeout(() => {
      let simulatedOutput = '';

      if (language.toLowerCase().includes('python')) {
        if (code.includes('whisper') || code.includes('Whisper')) {
          simulatedOutput = `Loading Whisper model...
Transcribing audio...
Recognized: "Go forward and pick up the red cup"
Command mapped to action: move_forward
Action executed successfully!`;
        } else if (code.includes('VLA') || code.includes('vla') || code.includes('VLAPipeline')) {
          simulatedOutput = `Initializing VLA Pipeline...
Processing visual input...
Processing linguistic input: "Bring me the coffee mug"
Fusing multi-modal information...
Generating action: navigate_to_object -> grasp_object
Action sequence completed successfully!`;
        } else if (code.includes('Task') || code.includes('task')) {
          simulatedOutput = `Initializing cognitive planning...
Decomposing task: "Go to kitchen and bring red cup"
Subtasks generated:
1. Navigate to kitchen
2. Identify red cup
3. Grasp red cup
4. Return to starting position
Task decomposition completed!`;
        } else {
          simulatedOutput = `Executing ${language} code...\nCode executed successfully!\nProcess completed with exit code 0`;
        }
      } else {
        simulatedOutput = `Executing ${language} code...\nCode executed successfully!`;
      }

      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={styles.codeRunner}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.controls}>
          <button
            onClick={runCode}
            disabled={isRunning}
            className={styles.runButton}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button
            onClick={copyToClipboard}
            className={styles.copyButton}
          >
            Copy
          </button>
        </div>
      </div>
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
      {output && (
        <div className={styles.outputContainer}>
          <div className={styles.outputHeader}>
            <span>Output</span>
          </div>
          <pre className={styles.output}>
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeRunner;