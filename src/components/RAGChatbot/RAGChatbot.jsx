import React, { useState, useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './RAGChatbot.module.css';

const RAGChatbot = ({ initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', content: 'Hello! I\'m your AI assistant for Physical AI & Humanoid Robotics. How can I help you with the course material today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { colorMode } = useColorMode();
  const { siteConfig } = useDocusaurusContext();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate RAG response - in a real implementation, this would call your backend API
      // For now, we'll provide some context-aware responses based on the course content
      const response = await simulateRAGResponse(inputValue.trim());

      const botMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRAGResponse = async (query) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const queryLower = query.toLowerCase();

    // Context-aware responses based on the course content
    if (queryLower.includes('vla') || queryLower.includes('vision-language-action')) {
      return `Based on the VLA (Vision-Language-Action) systems module (Chapter 5), VLA systems integrate perception, understanding, and action into unified AI frameworks. They enable robots to interpret visual cues, understand linguistic commands, and execute appropriate physical actions. The key components include multi-modal representation, end-to-end learning, and foundation models that process multiple modalities simultaneously.`;
    } else if (queryLower.includes('whisper') || queryLower.includes('voice') || queryLower.includes('audio')) {
      return `Whisper is used in VLA systems for voice-to-action processing. As covered in Chapter 5, Whisper processes audio input to convert spoken commands to text, which is then mapped to robot actions. The system includes audio preprocessing, noise filtering, and confidence scoring for reliable operation in real-world environments.`;
    } else if (queryLower.includes('ros') || queryLower.includes('robot operating system')) {
      return `ROS 2 (Robot Operating System 2) is covered in Chapter 2 of the textbook. It provides the foundation for robotics development with nodes, topics, services, and actions. ROS 2 enables communication between different robot components and provides tools for simulation, visualization, and debugging.`;
    } else if (queryLower.includes('task') || queryLower.includes('planning') || queryLower.includes('cognitive')) {
      return `Cognitive planning in VLA systems, as described in Chapter 5, involves decomposing complex tasks into manageable subtasks. The system uses Hierarchical Task Networks (HTN) to break down high-level commands into executable primitive actions, considering environmental constraints and potential failures. This includes dependency management and context-aware decomposition.`;
    } else if (queryLower.includes('multi-modal') || queryLower.includes('fusion')) {
      return `Multi-modal processing in VLA systems combines information from different sensory channels (vision, language, audio). Chapter 5 covers three main fusion strategies: early fusion (combining raw data), late fusion (combining final outputs), and intermediate fusion (combining at various processing levels). Cross-modal attention mechanisms allow information from one modality to influence processing in another.`;
    } else if (queryLower.includes('humanoid') || queryLower.includes('robot')) {
      return `Humanoid robot development is covered in Chapter 6 of the textbook. It includes mechanical design, control systems, bipedal locomotion, and balance control. The chapter covers kinematic chains, gait planning, and the integration of perception-action loops for natural human-robot interaction.`;
    } else if (queryLower.includes('gazebo') || queryLower.includes('simulation')) {
      return `Simulation environments like Gazebo are covered in Chapter 3. These environments allow for safe and efficient testing of robotics algorithms before deployment on physical robots. The chapter covers physics simulation, sensor simulation, and the integration of simulation with real-world robotics development.`;
    } else if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('help')) {
      return `Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics course. You can ask me about:
      • VLA (Vision-Language-Action) systems
      • ROS 2 fundamentals
      • Simulation environments (Gazebo, Unity)
      • Cognitive planning and task decomposition
      • Multi-modal processing
      • Humanoid robot development
      • Voice processing with Whisper
      • Any other topics from the textbook

      What would you like to learn about?`;
    } else {
      return `I can help you with the Physical AI & Humanoid Robotics course material. Based on your query about "${query}", I recommend checking Chapter 5 on Vision-Language-Action systems, which covers the integration of perception, understanding, and action in robotics. The course covers both theoretical concepts and practical implementations using tools like Whisper for voice processing and CLIP for vision-language integration.`;
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([
      { id: 1, type: 'assistant', content: 'Hello! I\'m your AI assistant for Physical AI & Humanoid Robotics. How can I help you with the course material today?' }
    ]);
  };

  if (!isOpen) {
    return (
      <button
        className={`${styles.chatButton} ${styles[colorMode]}`}
        onClick={toggleChat}
        aria-label="Open AI Assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.02 16.32L2 22L7.68 20.98C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.99 17.5C8.19 16.99 7 15.37 7 13.5C7 11.5 8.5 10 10.5 10C12.5 10 14 11.5 14 13.5C14 15.37 12.81 16.99 11 17.5V17.5C10.67 17.44 10.34 17.44 9.99 17.5ZM12 11.5C10.62 11.5 9.5 12.62 9.5 14C9.5 15.38 10.62 16.5 12 16.5C13.38 16.5 14.5 15.38 14.5 14C14.5 12.62 13.38 11.5 12 11.5Z" fill="currentColor"/>
        </svg>
      </button>
    );
  }

  return (
    <div className={`${styles.chatContainer} ${styles[colorMode]}`}>
      <div className={styles.chatHeader}>
        <div className={styles.chatTitle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.chatIcon}>
            <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.02 16.32L2 22L7.68 20.98C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.99 17.5C8.19 16.99 7 15.37 7 13.5C7 11.5 8.5 10 10.5 10C12.5 10 14 11.5 14 13.5C14 15.37 12.81 16.99 11 17.5V17.5C10.67 17.44 10.34 17.44 9.99 17.5ZM12 11.5C10.62 11.5 9.5 12.62 9.5 14C9.5 15.38 10.62 16.5 12 16.5C13.38 16.5 14.5 15.38 14.5 14C14.5 12.62 13.38 11.5 12 11.5Z" fill="currentColor"/>
          </svg>
          <span>AI Assistant</span>
        </div>
        <div className={styles.chatControls}>
          <button
            onClick={clearChat}
            className={styles.controlButton}
            title="Clear chat"
            aria-label="Clear chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
            </svg>
          </button>
          <button
            onClick={toggleChat}
            className={styles.controlButton}
            title="Close chat"
            aria-label="Close chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.type]} ${styles[colorMode]}`}
          >
            <div className={styles.messageContent}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistant} ${styles.loading} ${styles[colorMode]}`}>
            <div className={styles.messageContent}>
              <div className={styles.typingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className={styles.chatInputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about Physical AI & Robotics..."
          className={`${styles.chatInput} ${styles[colorMode]}`}
          disabled={isLoading}
          aria-label="Type your message"
        />
        <button
          type="submit"
          className={`${styles.sendButton} ${styles[colorMode]}`}
          disabled={!inputValue.trim() || isLoading}
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default RAGChatbot;