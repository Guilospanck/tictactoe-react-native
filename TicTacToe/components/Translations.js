
import LocalizedStrings from "localized-strings";

import * as RNLocalize from 'react-native-localize';

const TRANSLATIONS = new LocalizedStrings(
{
    en: {
        "AI": "AI",
        "No_name": "No name",
        "You" : "You",
        "Insert_players_name": "Type the player's name",
        "PLAY": "PLAY",
        "Discovering": "Discovering...",
        "Find_active_games": "Find active games",
        "Waiting_for_players": "Waiting for players...",
        "Wait_for_players": "Wait for players",
        "List_of_devices": "A list of devices that are advertising...",
        "No_nearby_devices": "No nearby devices...",
        "Swipe_down_to_update": "Swipe down to update",
        "Connecting": "Connecting",
        "won": "won!",
        "AI_won_the_game": "The AI has won the game!",
        "Draw": "Draw!",
        "Round": "Round",
        "RESTART_GAME": "RESTART GAME",
        "TIC_TAC_TOE": "Tic Tac Toe",
        "Please_wait": "Please, wait...",
        "Victory": "Victory!",
        "Connection_Error": "Connection Error!",
        "Try_again": "Try again.",
        "Disconnected": "Disconnected!",
        "Connection_off": "The connection with the other player has ended."
    },
    pt: {
        "AI": "IA",
        "No_name": "Sem nome",
        "You" : "Você",
        "Insert_players_name": "Insira o nome do Jogador",
        "PLAY": "JOGAR",
        "Discovering": "Descobrindo...",
        "Find_active_games": "Encontrar jogos ativos",
        "Waiting_for_players": "Esperando por jogadores...",
        "Wait_for_players": "Esperar jogadores",
        "List_of_devices": "Lista de dispositivos que estão hosteando...",
        "No_nearby_devices": "Sem dispositivos por perto...",
        "Swipe_down_to_update": "Deslize para baixo para atualizar",
        "Connecting": "Conectando..",
        "won": "venceu!",
        "AI_won_the_game": "IA venceu o jogo!",
        "Draw": "Empate!",
        "Round": "Rodada",
        "RESTART_GAME": "REINICIAR JOGO",
        "TIC_TAC_TOE": "Jogo da Velha",
        "Please_wait": "Por favor, espere...",
        "Victory": "Vitória!",
        "Connection_Error": "Erro de conexão!",
        "Try_again": "Tente novamente.",
        "Disconnected": "Desconectado!",
        "Connection_off": "A conexão com o outro jogador foi encerrada."
    },
    fr: {
        "AI": "IA",
        "No_name": "Sans nom",
        "You" : "Tu",
        "Insert_players_name": "Insérer le nom du joueur",
        "PLAY": "JOUER",
        "Discovering": "Découvrant...",
        "Find_active_games": "Découverte actif jeux",
        "Waiting_for_players": "Attendant joueurs...",
        "Wait_for_players": "Attendre joueurs",
        "List_of_devices": "Une liste des appareils qui font de la publicité...",
        "No_nearby_devices": "Aucun appareil à proximité...",
        "Swipe_down_to_update": "Glissez vers le bas pour mettre à jour",
        "Connecting": "Connectant..",
        "won": "a gagné!",
        "AI_won_the_game": "IA a gagné le jeux",
        "Draw": "Dessiner!",
        "Round": "Rond",
        "RESTART_GAME": "RECOMMENCER LE JEUX",
        "TIC_TAC_TOE": "Morpion",
        "Please_wait": "S'il vous plaît, attendez...",
        "Victory": "La victoire!",
        "Connection_Error": "Erreur de connexion!",
        "Try_again": "Réessayer.",
        "Disconnected": "Débranché!",
        "Connection_off": "La connexion avec l'autre joueur est terminée."
    }
},
{
    customLanguageInterface: () => {
        let rnlocale = RNLocalize.getLocales();
        return rnlocale[0].languageCode;
    }
}
);
export default TRANSLATIONS;