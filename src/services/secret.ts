export type FetchSecretArgs = {
  email: string
}

export async function fetchSecret({ email }: FetchSecretArgs): Promise<string> {
  const response = await fetch('/api/secret', {
    method: 'POST',
    headers: {
      'X-Assignment-Code': 'barcelona',
      'X-Candidate': email,
      Accept: 'application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error)
  }

  return data.secret
}

