const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const userInfo = {
    user_id: "ayananshu_koner_06022004", 
    email: "ayananshu.koner2022@vitstudent.ac.in",
    roll_number: "22BCE0420"
};

const isAlphabetString = (str) => {
    return /^[A-Z]+$/i.test(str);
};

const isNumber = (str) => {
    return !isNaN(parseFloat(str)) && isFinite(str);
};

const getAlternatingCapsString = (inputStr) => {
    let result = '';
    let toggle = true; 
    for (let i = 0; i < inputStr.length; i++) {
        const char = inputStr[i];
        if (toggle) {
            result += char.toUpperCase();
        } else {
            result += char.toLowerCase();
        }
        toggle = !toggle;
    }
    return result;
};

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: userInfo.user_id,
                error: "Invalid input. 'data' must be a non-empty array."
            });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        const alphabet_concat_array = [];

        data.forEach(item => {
            if (isNumber(item)) {
                const num = parseInt(item, 10);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            }
            else if (isAlphabetString(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_concat_array.push(item);
            }
            else {
                special_characters.push(item);
            }
        });

        const reversed_alphabet_strings = alphabet_concat_array.reverse();
        const combined_reversed_string = reversed_alphabet_strings.map(str =>
            str.split('').reverse().join('')
        ).join('');

        const concat_string = getAlternatingCapsString(combined_reversed_string);
        
        const response = {
            is_success: true,
            user_id: userInfo.user_id,
            email: userInfo.email,
            roll_number: userInfo.roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum), 
            concat_string
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            is_success: false,
            user_id: userInfo.user_id,
            error: "An internal server error occurred."
        });
    }
});

app.get('/', (req, res) => {
    res.send('The API is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
