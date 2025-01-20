# Macgarden ![Mac Garden Screenshot](example.png)

![License](https://img.shields.io/badge/license-GPL--3.0-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.1-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-orange)
[![Tests](https://github.com/paradise-runner/macgarden/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/paradise-runner/macgarden/actions/workflows/test.yml)
[![Code Quality](https://github.com/paradise-runner/macgarden/actions/workflows/code-quality.yml/badge.svg?branch=main)](https://github.com/paradise-runner/macgarden/actions/workflows/code-quality.yml)
[![codecov](https://codecov.io/gh/paradise-runner/macgarden/graph/badge.svg?token=E4ZVSUXUQR)](https://codecov.io/gh/paradise-runner/macgarden)

**Visit the site: [themacgarden.com](https://themacgarden.com)**

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Comparing Devices](#comparing-devices)
- [Coming Soon](#coming-soon)
- [Contributing](#contributing)
- [License](#license)

## Overview

A simple website showing Mac performance data. The data is fetched from the Geekbench Browser API and displayed in a user-friendly way for easy comparison. The website is built using Next.js, Tailwind CSS, and TypeScript. It is hosted on Cloudflare Pages. The data is fetched and stored in a JSON file for faster loading times.

## Prerequisites

Before you begin, ensure you have:
- [Bun](https://bun.sh/) installed
- [Just](https://just.systems/man/en/) command runner installed
- A Cloudflare account for deployment
- Geekbench Browser API access (for data fetching)

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
- To update the data from data.json into src/lib/devices.ts, run:
  ```
  just update
  ```
- To start the development server with a fresh data fetch, run:
  ```
  just fresh-start
  ```
- To deploy the project with a fresh data fetch, run:
  ```
  just fresh-deploy
  ```
- To run tests, run:
  ```
  just test
  ```

## Deployment

This project is configured for Cloudflare Pages deployment:

- Build command: `just build`

### Manual Deployment

1. Fork this repository
2. Connect it to Cloudflare Pages
3. Configure your build settings
4. Deploy!

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

## Coming Soon

Exciting features in development:
- Search functionality in device selection dropdowns
- ~~Filter devices by release year~~
- ~~Performance trend visualization~~
- Dark mode support
- ~~Export comparison data~~

## Contributing

Feel free to open issues or submit pull requests for improvements.

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
