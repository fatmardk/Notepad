export const girisYap = () => {
  return {
    type: 'SIGN_IN'
  }
}

export const topla = (sayi) => {
  return {
    type: 'TOPLA',
    payload: sayi
  }
}

export const cikar = () => {
  return {
    type: 'CIKAR'
  }
}
