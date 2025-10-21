const pieces = {
    king: {
        notation: 'K',
        name: 'King'
    },
    queen: {
        notation: 'Q',
        name: 'Queen'
    },
    rook: {
        notation: 'R',
        name: 'Rook'
    },
    bishop: {
        notation: 'B',
        name: 'Bishop'
    },
    knight: {
        notation: 'N',
        name: 'Knight'
    },
    pawn: {
        notation: '',
        name: 'pawn'
    }
};

const actions = {
    move: {
        notation: '',
        name: 'Move'
    },
    capture: {
        notation: 'x',
        name: 'Capture'
    },
    check: {
        notation: '+',
        name: 'Check'
    },
    checkmate: {
        notation: '#',
        name: 'Checkmate'
    },
    promotion: {
        notation: '=',
        name: 'Promotion'
    },
    kingsideCastling: {
        notation: '0-0',
        name: 'Kingside Castling'
    },
    queensideCastling: {
        notation: '0-0-0',
        name: 'Queenside Castling'
    }
};

function createNotation(piece, action, destination, additional) {
    let notation = '';
    if (action === actions.kingsideCastling.notation || action === actions.queensideCastling.notation) {
        notation = action;
    } else {
        notation = piece;
        if (action === actions.capture.notation) {
            notation += action;
        }
        notation += destination;
    }

    if (additional && action === actions.promotion.notation) {
        notation += actions.promotion.notation + additional;
    }

    if (additional === actions.check.notation || additional === actions.checkmate.notation) {
        notation += additional;
    }
    return notation;
}

function formatTextToNotation(input) {
    const {
        piece,
        action,
        destination,
        additional
    } = input;
    return createNotation(piece, action, destination, additional);
}

const examples = [{
        piece: pieces.bishop.notation,
        action: actions.move.notation,
        destination: 'e5'
    },
    {
        piece: pieces.bishop.notation,
        action: actions.capture.notation,
        destination: 'f5'
    },
    {
        piece: pieces.pawn.notation,
        action: actions.move.notation,
        destination: 'e4'
    },
    {
        piece: pieces.king.notation,
        action: actions.kingsideCastling.notation,
        destination: ''
    },
    {
        piece: pieces.pawn.notation,
        action: actions.promotion.notation,
        destination: 'b8',
        additional: pieces.queen.notation + actions.check.notation
    }
];

for (let i = 0; i < examples.length; i++) {
    console.log(formatTextToNotation(examples[i]));
}
