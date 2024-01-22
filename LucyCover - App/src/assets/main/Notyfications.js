

export const GetNotyficationDetails = (notyficationType,notyficationDescription) => {
    switch(notyficationType){
        case 'newMessage':
            return {
                backgroundType: 'newMessage',
                title: 'NOWA WIADOMOŚĆ',
                description: !notyficationDescription ?  `W zakładce 'korespondencja' pojawiła/y się nowe wiadomości` : notyficationDescription
            }
        case 'systemInfo':
            return {
                backgroundType: 'systemNotyfication',
                title: 'Inf. Systemowa',
                description: !notyficationDescription ? `Uwaga, na dzień 24.06.2023 zaplanowane została wykonanie kopi zapasowej !` : notyficationDescription
            }
        case 'warning':
            return {
                backgroundType: 'warning',
                title: 'UWAGA',
                description: !notyficationDescription ? `Uwaga, wykryto nieprawidłowości` : notyficationDescription
            }
    }
}