
export function useTelegram () {
    const tg = window.Telegram.WebApp;
    const onClose = () => {
        tg.close();
    }
    return {
        onClose,
        tg,
    }
}

