# Macgarden ![Example Image](example.png)

![License](https://img.shields.io/badge/license-GPL--3.0-yellow)
![Next.js](https://img.shields.io/badge/Next.js-13.4-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-orange)

## Table of Contents

- [Overview](#overview)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Comparing Devices](#comparing-devices)
- [Contributing](#contributing)
- [License](#license)

## Overview

A simple website showing Mac performance data. The data is fetched from the Geekbench Browser API and displayed in a user-friendly way for easy comparison. The website is built using Next.js, Tailwind CSS, and TypeScript. It is hosted on Cloudflare Pages. The data is fetched and stored in a JSON file for faster loading times.

## Usage

- To fetch the latest data, run:
  ```
  just download
  ```
- To start the local server, run:
  ```
  just start
  ```
- To build the project, run:
  ```
  just build
  ```
- To deploy the project, run:
  ```
  just deploy
  ```

## Technologies Used

- Next.js for server-rendered React apps
- Tailwind CSS for styling
- TypeScript for type safety
- Just for task automation
- Bun for managing dependencies
- Cloudflare Pages for hosting

## Comparing Devices

On the main page, you can:

- Filter devices by model type (e.g., MacBook Pro, MacBook Air) using toggle buttons.
- Choose any two devices from the comboboxes to compare their Single-Core and Multi-Core scores.
- View percentage differences in performance at a glance.

Enjoy exploring Mac performance stats!

## Contributing

Feel free to open issues or submit pull requests for improvements.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
```
