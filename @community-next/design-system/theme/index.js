const colors = {
  white: "#FFFFFF",
  black: "#1C1C1C",
  transparent: "transparent",
  "light-gray": {
    content1: "#1C1C1C",
    content2: "#585757",
    content3: "#969696",
    border: "#E8E8E8",
    "background-secondary": "#F7F7F7",
    "background-primary": "#FFFFFF",
  },
  "dark-gray": {
    content1: "#E8E8E8",
    content2: "#BABABA",
    content3: "#767676",
    border: "#313131",
    "background-secondary": "#272727",
    "background-primary": "#1A1A1A",
  },
  "light-blue": {
    pressed: "#1272cc",
    base: "#0085FF",
    hover: "#339DFF",
    border: "#CCE7FF",
    background: "#E5F3FF",
  },
  "dark-blue": {
    pressed: "#2a72cc",
    base: "#168FFF",
    hover: "#45a5ff",
    border: "#193148",
    background: "#1a2631",
  },
  "light-green": {
    pressed: "#00952A",
    base: "#00ba34",
    hover: "#33c85d",
    border: "#CCF1D6",
    background: "#E5F8EB",
  },
  "dark-green": {
    pressed: "#12a239",
    base: "#17cb49",
    hover: "#45d56d",
    border: "#193d22",
    background: "#192c1f",
  },
  "light-orange": {
    pressed: "#c76b00",
    base: "#F98base",
    hover: "#fa9e33",
    border: "#fde7cc",
    background: "#fef4e8",
  },
  "dark-orange": {
    pressed: "#cc7f25",
    base: "#FF9F2D",
    hover: "#fbb157",
    border: "#48351d",
    background: "#31271c",
  },
  "light-red": {
    pressed: "#ba2322",
    base: "#E92C2C",
    hover: "#ed5656",
    border: "#fbd5d5",
    background: "#feeaeb",
  },
  "dark-red": {
    pressed: "#c63434",
    base: "#F74141",
    hover: "#f96767",
    border: "#452222",
    background: "#301f1e",
  },
  "light-yellow": {
    pressed: "#c8a311",
    base: "#FACC15",
    hover: "#fbd644",
    border: "#fdf5d0",
    background: "#fefae8",
  },
  "dark-yellow": {
    pressed: "#c8a51b",
    base: "#FACE22",
    hover: "#fbd84e",
    border: "#473e1b",
    background: "#302c1c",
  },
};

const boxShadow = {
  sm: "0px 1px 1px rgba(0, 0, 0, 0.06)",
  DEFAULT: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08)",
  md: "0px 3px 5px rgba(0, 0, 0, 0.1), 0px 1px 18px rgba(0, 0, 0, 0.06), 0px 6px 10px rgba(0, 0, 0, 0.08)",
  lg: "0px 11px 15px rgba(0, 0, 0, 0.1), 0px 9px 46px rgba(0, 0, 0, 0.06), 0px 24px 38px rgba(0, 0, 0, 0.04)",

  "focused-light-blue": "0px 0px 2px 2px rgba(0, 133, 255, 0.15)",
  "focused-dark-blue": "0px 0px 2px 2px rgba(22, 143, 255, 0.18)",
  "focused-light-green": "0px 0px 2px 2px rgba(0, 186, 52, 0.15)",
  "focused-dark-green": "0px 0px 2px 2px rgba(23, 203, 73, 0.18)",
  "focused-light-red": "0px 0px 2px 2px rgba(249, 134, 0, 0.15)",
  "focused-dark-red": "0px 0px 2px 2px rgba(255, 159, 45, 0.18)",
  "focused-light-orange": "0px 0px 2px 2px rgba(233, 44, 44, 0.15)",
  "focused-dark-orange": "0px 0px 2px 2px rgba(247, 65, 65, 0.18)",
}

const backgroundImage = {
  "invalid-icon": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\")",
  "valid-icon": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\")",
  "check-icon": "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e\")"
}

module.exports = {
  colors,
  boxShadow,
  backgroundImage
}
