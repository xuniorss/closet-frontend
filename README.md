# Frontend e-commerce

Este projeto foi desenvolvido usando React.js 18.0.x e foi utilizado o Next.js 13.3.x, cujo objetivo do projeto seria apenas a integração com o backend em Adonis.js. Frontend consiste em dois tipos de perfil de usuário, onde o perfil perfil administrador pode cadastrar novas mercadorias e o perfil contrário não tem acesso a tal funcionalidade.

## 🚀 Começando

Para executar esta aplicação em seu ambiente local, siga os passos abaixo:

### 🔧 Instalação

#### 1. Clone o repositório:

```shell
git clone https://github.com/xuniorss/closet-frontend.git
```

#### 2. Navegue até o diretório do projeto:

```shell
cd closet-frontend
```

#### 3. Instale as dependências:

```shell
npm i
# ou
yarn
```

## ⚙️ Configuração para início da aplicação

#### Com sua ide aberta:

1. Para facilitar, disponibilizo o conteúdo da `.env`, em `NEXT_PUBLIC_WHATSSAPP_MESSAGE_API` substitua o valor `contato` por um número válido no formato com `ddd` incluso.

```js
NEXT_PUBLIC_API_BASE_URL = 'http://localhost:3333'
NEXT_PUBLIC_COOKIES = '@nextauth.token.closet'
NEXT_PUBLIC_AUTH_USER = 'authenticated.user'

NEXT_PUBLIC_FIREBASE_API_KEY = 'AIzaSyAdXN0ESPk6AReDDU5FryvHMtaUtue6gVE'
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'closet-nextjs-ead11.firebaseapp.com'
NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'closet-nextjs-ead11'
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'closet-nextjs-ead11.appspot.com'
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '376785490332'
NEXT_PUBLIC_FIREBASE_APP_ID = '1:376785490332:web:2476651c838adb9d66b859'

NEXT_PUBLIC_ALL_MODELS = 'all.models.registred'
NEXT_PUBLIC_ALL_PRODUCTS = 'all.products'
NEXT_PUBLIC_ALL_SIZES = 'all.sizes.registred'
NEXT_PUBLIC_MODEL_STORAGE = '@model.storage'
NEXT_PUBLIC_ALL_COLLECTIONS = '@all.collections'
NEXT_PUBLIC_WISHLIST = '@clst_user_wishlist'

NEXT_PUBLIC_WHATSSAPP_MESSAGE_API = 'https://api.whatsapp.com/send?phone=+55{contato}&text='

NEXT_PUBLIC_API_FOR_DYNAMIC_METADATA = 'http://127.0.0.1:3333'
```

### 🏃‍♂️ Iniciando o projeto

```shell
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

-  use o perfil administrativo criado previamente no backend para acessar o sistema, após acesado será liberado um botão `Área restrita`, ao acessar a página o usuário poderá cadastrar suas mercadorias. As demais funcionalidades são intuitivas.

## 🛠️ Algumas libs utilizadas

-  [typescript](https://www.typescriptlang.org/)
-  [chakra-ui](https://chakra-ui.com/)
-  [react-dropzone](https://react-dropzone.js.org/)
-  [react-hook-form](https://react-hook-form.com/)
-  [zod](https://zod.dev/)
-  [zustand](https://zustand-demo.pmnd.rs/)
-  [firebase](https://firebase.google.com/docs?hl=pt-br)
-  [date-fns](https://date-fns.org/)

---

por [Gilberto Fortunato](https://github.com/xuniorss)
