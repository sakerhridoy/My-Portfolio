import { useEffect } from 'react';
import { useSite } from '../site/SiteContext';

/**
 * Dynamically configures the AI Assistant chatbot (e.g. Chatbase / window.chatbase)
 * with the current tenant profile's name, email, and phone from identity / userProfile / settings.
 */
const AiChatConfig = () => {
  const { identity, userProfile, settings } = useSite();

  useEffect(() => {
    const name = userProfile?.name || identity?.heroTitle || settings?.heroTitle || 'Saker Ahmed Hridoy';
    const email = userProfile?.email || identity?.email || settings?.email || '';
    const phone = settings?.phone || '';
    const assistantName = `${name}'s AI Assistant`;

    // Configure chatbase or chatbot widget dynamically if present
    if (window.chatbase) {
      try {
        window.chatbase('config', {
          chatbotName: assistantName,
          metadata: {
            name,
            email,
            phone,
          },
        });
      } catch (e) {
        // Chatbase might queue config calls
        window.chatbase.q = window.chatbase.q || [];
        window.chatbase.q.push(['config', {
          chatbotName: assistantName,
          metadata: { name, email, phone },
        }]);
      }
    }
  }, [identity, userProfile, settings]);

  return null;
};

export default AiChatConfig;
