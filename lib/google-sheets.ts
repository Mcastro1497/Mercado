import { google } from "googleapis"

// Definir la estructura de los datos
interface MarketData {
  Ticker: string
  Instrumento: string
  "Moneda de pago": string
  Legislación: string
  "Fecha de vencimiento": string
  TIR: number
  Duration: number
}

export async function fetchMarketData(): Promise<MarketData[]> {
  try {
    // Usar las credenciales proporcionadas
    const credentials = {
      type: "service_account",
      project_id: "credenciales-414419",
      private_key_id: "4541e49839105cf77cd918575de1efc0aa25b288",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC01UVoJRx3YJ4x\n5XjtB7kNlmy3hEhPFkpyME89QgQIg0PWkiFB1MblNB0NzJNzY0aN6S+GqqqYllac\n9QuNdY40I4ocIssmajXrZsu5nRWbUALkNNnrUNipAOZkSZ488Ln1gl0W4+Cj1pNw\nPKVf/GzkLgOG+1qD76igenmFE0s6XOz2yxWJDUrRjRWx9FEZEObvD6XwnAgPDpWR\nGN5Lwo43xiiHrnFEcVchJTf6T0y7FSpgYzCEVvVuyoglKY5PLC130ryTb3AuqZs3\nnZ6A8zTx//hXrDXs4NRV4EkQmqaHIErwKQOJ5oB+WRt2V1KKmd18Hk/KaXNF5wvs\ns8cRjSBXAgMBAAECggEABCrQB9I1VuVf7+ZRC13DzllMeU0Tfbv5RVVjVhYAGQQf\nm137EBwIHgW9szf8Z3ViYwTuRp3qWC+8hAR09xYwC7DFTxE8MrKZHdWyHISke4yC\nbIxwzdhkKj6nHsVObg5Pq6WpRPdh9SnxV8Mwr8bAd+CSeJIGL0BJdEDY9J31fD0t\nl1an8kBgEKChKzKlfNpGAPphhJzgolulhfQxQMMF4UuoTZVrh9C+EFwM/j5qIX15\ntL8uzIDNYAjLd0o/J7uztdiIyxZqV4hU078ixCNnQwQgXE7E9S7rlEZcNrx/L436\npY4GJACvIjSkwo80lTdCSpU6TSQsekDHEw+Nf3yE+QKBgQD9+8R2DJS1bvW1GKXo\nHTblW0UZ5LY9RqZFwTiKvi5tGm66lr8poJbW5nwxUmlpEjL8Iu4/oQqNyMLg5Fox\nmE/JanxngPOJyWnr1TiaWnhglLV48AFw+C/lovf1IiwTmFfOZxtukTHU9P/g7ghZ\nqCyeDOFjJ97/bnDgn5xlYX/rnwKBgQC2RNKEjPF7NwYUeSGx9yLyLPVuu4g9Z1/n\nWfyKzPlRmuQ3ELnnbLykL0PgCyF2oKKVOVKgk6kzjarsq4ZLvSqNPkEogmNTApYP\n+GTpE8Im1Twjjb79WkOpHx5fqtkv55uUnkJlkknSLJUKpBz7UWd27V2QdxEkVlcQ\n4FUIrAcQSQKBgBmM93GsyFUMSZmjViVosvoV2XjGYnL9pYKE8qw6f68oJpWMzsRg\nTGxoGXxYvxP76bclyHQMPmSPGtPHBS/SE8y+cq9y8I0e/xHjjGMy0MNekncNJgf4\nX9EpOOqnOmnqPIMeKktQPgQfdZJqP9rNKVfpEc+I1k06Dg7635/vVBAfAoGBAKYI\nTUhHZ5XZCqXNrf8CZAf9IlmLZNCigT8qvpzlmNtYYDk0+FOyvqhFEexd107Lhy6t\nt/HkcIYwr5nFqaEGoWNmaU5wb+/m9DF6ENoskHh1V8H/VhJNjkLZwP5ekFdOAHBC\nNbN2rd5RlDbMRkY84iX4lXmKrMfQCqGp6Gvs4MZZAoGBAOiDINDypKgrNV0mlhKH\nILc19ad+TJ4EOlUYEytpsGwd7yKmDsjKBQpzzoyXNF7CjI6mYgeQFdXNx26YL/t4\nNVQ1gWnXnfOT6Y2OaHirRm9v+Qo7UUNIKPumliK4+5c5fnCQrMrPHZ3lpljaOc+q\ntt4ePJBpvAX5H6XUUSZAIPnM\n-----END PRIVATE KEY-----\n",
      client_email: "manuel-castro@credenciales-414419.iam.gserviceaccount.com",
      client_id: "101364486808126328014",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/manuel-castro%40credenciales-414419.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // ID de la hoja de cálculo y rango
    const spreadsheetId = "1tKqfadQEUKtKTON7ngX1hpMZAriWqOTPwRgJ9atqI74"
    const range = "Cuadro!A:G"

    // Obtener datos
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    })

    const rows = response.data.values || []
    console.log("Encabezados de Google Sheets:", rows[0])
    console.log("Primera fila de datos:", rows[1])

    // Convertir filas a objetos usando la primera fila como encabezados
    if (rows.length > 0) {
      const headers = rows[0].map((header: string) => header.trim())

      // Mapeo explícito de índices de columnas a nombres de propiedades
      const columnMap = {
        0: "Ticker",
        1: "Instrumento",
        2: "Moneda de pago",
        3: "Legislación",
        4: "Fecha de vencimiento",
        5: "TIR",
        6: "Duration",
      }

      const data = rows.slice(1).map((row) => {
        const obj: any = {}

        // Usar el mapeo explícito para asignar valores
        Object.entries(columnMap).forEach(([index, propName]) => {
          const i = Number.parseInt(index)
          if (propName === "TIR" || propName === "Duration") {
            obj[propName] = row[i] ? Number.parseFloat(row[i]) : 0
          } else {
            obj[propName] = row[i] || ""
          }
        })

        return obj
      })

      // Imprimir el primer objeto para depuración
      if (data.length > 0) {
        console.log("Primer objeto procesado:", data[0])
      }

      return data as MarketData[]
    }

    return []
  } catch (error) {
    console.error("Error al obtener datos de Google Sheets:", error)
    return []
  }
}

