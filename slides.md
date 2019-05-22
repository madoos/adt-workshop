### Monoides, functores y mónadas: Bienvenido al mundo de los ADTs

--

- Teoría de categorías ¿Por qué interesa para la programación?
- Estructura algebraica
- Entender los ADTs (setoide y ord como ejemplo)
- Monoide
- Funtor
- Funtor aplicativo
- Mónada

--

### ADTs

- Identity
- Maybe
- IO
- Future
- Stream

--
### Teoría de categorías

--

La teoría de categorías es un estudio matemático que trata de axiomatizar de forma abstracta diversas estructuras matemáticas como una sola, mediante el uso de objetos y morfismos. Al mismo tiempo trata de mostrar una nueva forma de ver las matemáticas sin incluir las nociones de elementos, pertenencia, entre otras.

--

![picture](https://nikgrozev.com/images/blog/Functional%20Programming%20and%20Category%20Theory%20Part%201%20-%20Categories%20and%20Functors/endofunctor.jpg)

--

![picture](https://cdn-images-1.medium.com/max/3998/1%2A-JICmgqkQmDXmNVkei9AbQ.jpeg)
--

¿Por qué interesa para la programación?

--

Porque es la teoria de la composición y nos brinda herramientas que nos permiten componer software de forma consistente.

--

### Estructura algebraica

--

En álgebra abstracta, una estructura algebraica, también conocida como sistema algebraico, es una n-tupla (a1, a2, ..., an), donde a1 es un conjunto dado no vacío, y {a2, ..., an} un conjunto de operaciones aplicables a los elementos de dicho conjunto.

--

Las estructuras algebraicas se clasifican según las propiedades que cumplen las operaciones sobre el conjunto dado. En estructuras algebraicas más elaboradas, se definen además varias leyes de composición.

--

![picture](https://raw.githubusercontent.com/fantasyland/fantasy-land/master/figures/dependencies.png)

--

### ADTs

Setoide y Ord como ejemplo

--

### Monoide

--
![picture](https://i.pinimg.com/originals/fa/fa/99/fafa990c40ca49c69367f8221f097bb8.jpg)

Es una estructura algebraica con una operación binaria, que es asociativa y tiene elemento neutro, es decir, es un semigrupo con identidad.

--
![picture](https://cdn141.picsart.com/270074705011201.jpg?c256x256)
Objeto que tiene una forma de concatenarse con otros y contiene un elemento neutro.
Si muchos objetos se tienen que concatenar no importa el orden porque siempre siempre se obtiene mismo resultado.

--

### Funtor

--

![picture](https://i.pinimg.com/originals/fa/fa/99/fafa990c40ca49c69367f8221f097bb8.jpg)


Es una función de una categoría a otra que lleva objetos a objetos y morfismos a morfismos de manera que la composición de morfismos y las identidades se preserven.

--

![picture](https://cdn141.picsart.com/270074705011201.jpg?c256x256)

Son contextos seguros para ejecutar funciones puras y permiten utilizar nuestras funciones independientemente del contexto.

--

### Funtor aplicativo

--

![picture](https://i.pinimg.com/originals/fa/fa/99/fafa990c40ca49c69367f8221f097bb8.jpg)


Es una estructura intermedia entre los funtores y las mónadas, permitiendo la secuenciación de varias computaciones funtoriales (al contrario que los funtores en general) pero sin poder hacer depender la próxima computación del resultado de la anterior (a diferencia de las mónadas). Técnicamente, en teoría de categorías, los funtores aplicativos son funtores monoidales laxos con fuerza tensorial.

--

![picture](https://cdn141.picsart.com/270074705011201.jpg?c256x256)

Nos permite poner una función en un contexto, hacer operaciones entre contextos y computar en paralelo.

--

### Mónada

--
![picture](https://i.pinimg.com/originals/fa/fa/99/fafa990c40ca49c69367f8221f097bb8.jpg)


Es un moniode en la categoría de los endofuntores

--

Es un endofunctor (un functor desde una categoría hacia ella misma), junto con dos transformaciones naturales. Las mónadas son utilizadas en la teoría de pares de functores adjuntos, y generalizan los operadores de clausura en conjuntos parcialmente ordenados a categorías arbitrarias.

--

![picture](https://cdn141.picsart.com/270074705011201.jpg?c256x256)


Nos permite olvidarnos de que tenemos contextos del mismo tipo anidados y computar secuencialmente.

--
Muchas gracias!!

![picture](https://s5.eestatic.com/2016/12/16/social/Memes-Humor-Redes_sociales-Internet-La_Jungla_178744040_23538138_1706x960.jpg)

---
