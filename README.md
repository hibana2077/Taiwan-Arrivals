# Taiwan Arrivals

A small project to display the number of visitors to Taiwan and their purpose.

![Cover](./assets/img/cover.png)

## Data Source

- [Taiwan Tourism Bureau](https://admin.taiwan.net.tw/statistics/yearly/)
- [交通部統計查詢網](https://stat.motc.gov.tw/)

## Usage

### Git Clone

```bash
git clone https://github.com/hibana2077/Taiwan-Arrivals.git
```

### Start

```bash
cd Taiwan-Arrivals
cd src
docker compose up -d --build
```

### Stop

```bash
docker compose down
```

### Access

- [http://localhost:8080](http://localhost:8080)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.