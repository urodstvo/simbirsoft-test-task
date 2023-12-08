module.exports = {
    plugins: {
        "postcss-preset-mantine": {},
        "postcss-simple-vars": {
            variables: {
                "mantine-breakpoint-xs": "0em",
                "mantine-breakpoint-sm": "414px",
                "mantine-breakpoint-md": "768px",
                "mantine-breakpoint-lg": "896px",
                "mantine-breakpoint-xl": "1300px"
            }
        }
    }
};
