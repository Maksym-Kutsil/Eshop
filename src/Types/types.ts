type TypeProductVariant = {
    color: string[]
    storage: string[]
}

type TypeComment = {
    user: string
    text: string
    rating: number
}

export type TypeProduct = {
    id: string
    title: string
    description: string
    image: string[]
    available: boolean
    variants: TypeProductVariant
    price: number
    isLiked: boolean
    comments: TypeComment[]
}

export type TypeCartItem = {
    id: string
    title: string
    description: string
    image: string
    available: boolean
    variants: TypeProductVariant
    price: number
    isLiked: boolean
    comments: TypeComment[]
    count: number
}