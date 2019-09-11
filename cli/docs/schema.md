# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Permitted             |            |

# Properties

| Property                        | Type      | Required   | Nullable | Defined by                                 |
| ------------------------------- | --------- | ---------- | -------- | ------------------------------------------ |
| [iteration](#iteration)         | `number`  | Optional   | No       | (this schema)                              |
| [name](#name)                   | `string`  | Optional   | No       | (this schema)                              |
| [postcondition](#postcondition) | `object`  | Optional   | No       | (this schema)                              |
| [precondition](#precondition)   | `object`  | Optional   | No       | (this schema)                              |
| [skip](#skip)                   | `boolean` | Optional   | No       | (this schema)                              |
| [steps](#steps)                 | `array`   | Optional   | No       | (this schema)                              |
| [url](#url)                     | `string`  | Optional   | No       | (this schema)                              |
| `*`                             | any       | Additional | Yes      | this schema _allows_ additional properties |

## iteration

繰り返す回数

`iteration`

- is optional
- type: `number`
- defined in this schema

### iteration Type

`number`

## name

シナリオ名. `--target` オプションで指定する.

`name`

- is optional
- type: `string`
- defined in this schema

### name Type

`string`

## postcondition

scenario がすべて終了した時, もしくは, scenario が異常終了した時に実行される. error handling などの custom action を定
義して使用する.

`postcondition`

- is optional
- type: `object`
- defined in this schema

### postcondition Type

`object` with following properties:

| Property | Type  | Required |
| -------- | ----- | -------- |
| `steps`  | array | Optional |

#### steps

action を記述する.

`steps`

- is optional
- type: `array`

##### steps Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

input type=form, date もしくは textarea に対する入力を行う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="email"]'
      constrains:
        regexp: '([a-z]|[0-9]){5,10}@test\.com'
- action:
    type: input
    form:
      selector: 'input[name="name"]'
      value: "name"
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |
| `value`      |        | Optional |

#### constrains

value か constrains のどちらか片方しか指定できない. 任意の文字列を入力したい場合は value を, 与えた正規表現から任意の文
字列を入力したい場合は constraints を使う

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `regexp`   | string  | Optional |
| `required` | boolean | Optional |

#### regexp

正規表現を満たすような文字列を自動で出力する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="email"]'
      constrains:
        regexp: '([a-z]|[0-9]){5,10}@test\.com'
```

`regexp`

- is optional
- type: `string`

##### regexp Type

`string`

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### selector

css selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### value

value か constrains のどちらか片方しか指定できない. 任意の文字列を入力したい場合は value を, 与えた正規表現から任意の文
字列を入力したい場合は constraints を使う

`value`

- is optional
- type: complex

##### value Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `faker`  | string | Optional |

#### faker

[faker](https://www.npmjs.com/package/faker) を使う時に使用する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="address"]'
      value:
        faker: address.city
```

`faker`

- is optional
- type: `string`

##### faker Type

`string`

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `date`   | string | Optional |

#### date

input type="date"に入力する場合に使う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="birthday"]'
      value:
        date: "1989-04-01"
```

`date`

- is optional
- type: `string`

##### date Type

`string`

#### Option 3

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `input` |             |

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

HTML の element を click する

##### example

```yaml
- action:
    type: click
    selector: 'button[name="applyButton"]'
    navigation: true
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property       | Type    | Required |
| -------------- | ------- | -------- |
| `emulateMouse` | boolean | Optional |
| `meta`         | object  | Optional |
| `navigation`   | boolean | Optional |
| `selector`     | string  | Optional |
| `type`         | string  | Optional |

#### emulateMouse

Chrome only 指定された element の座標の上で mouse の click イベントを発火させる.

`emulateMouse`

- is optional
- type: `boolean`

##### emulateMouse Type

`boolean`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### navigation

Chome only link をクリックする際に使う. page の navigation が発生するまで wait する.

##### example

```yaml
- action:
    type: click
    selector: 'button[name="applyButton"]'
    navigation: true
```

`navigation`

- is optional
- type: `boolean`

##### navigation Type

`boolean`

#### selector

css selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `click` |             |

#### Option 3

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

Select Box を操作する action values で指定した中からランダムに選ばれる

##### example

```yaml
- action:
    type: select
    form:
      selector: 'select[name="prefecture"]'
      constrains:
        values:
          - 1
          - 2
          - 3
          - 4
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |

#### constrains

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `required` | boolean | Optional |
| `values`   | array   | Optional |

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### values

`values`

- is optional
- type: `array`

##### values Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `faker`  | string | Optional |

#### faker

[faker](https://www.npmjs.com/package/faker) を使う時に使用する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="address"]'
      value:
        faker: address.city
```

`faker`

- is optional
- type: `string`

##### faker Type

`string`

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `date`   | string | Optional |

#### date

input type="date"に入力する場合に使う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="birthday"]'
      value:
        date: "1989-04-01"
```

`date`

- is optional
- type: `string`

##### date Type

`string`

#### Option 3

`string`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `select` |             |

#### Option 4

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

duration(ms)の間 Sleep する action

##### example

```yaml
- action:
    type: wait
    duration: 1000
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `duration` | number | Optional |
| `meta`     | object | Optional |
| `name`     | string | Optional |
| `type`     | string | Optional |

#### duration

`duration`

- is optional
- type: `number`

##### duration Type

`number`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `wait` |             |

#### Option 5

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

url の location がパラメータで与えられたものかどうかをチェックする

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `location` | object | Optional |
| `meta`     | object | Optional |
| `name`     | string | Optional |
| `type`     | string | Optional |

#### location

`location`

- is optional
- type: `object`

##### location Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `regexp` | string | Optional |
| `value`  | string | Optional |

#### regexp

`regexp`

- is optional
- type: `string`

##### regexp Type

`string`

#### value

`value`

- is optional
- type: `string`

##### value Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `ensure` |             |

#### Option 6

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

input type="radio" の操作に使用する

##### example

```yaml
- action:
    type: radio
    form:
      selector: 'input[name="radio-check"]'
      value: false
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |
| `value`      | string | Optional |

#### constrains

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `required` | boolean | Optional |

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### value

`value`

- is optional
- type: `string`

##### value Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `radio` |             |

#### Option 7

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

Screenshot を取得する Action `[browser名]-[timestamp]-[name].png` というファイル名で screenshot を書き出す

##### example

```yaml
- action:
    type: screenshot
    name: filename
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `fullPage` | boolean | Optional |
| `meta`     | object  | Optional |
| `name`     | string  | Optional |
| `type`     | string  | Optional |

#### fullPage

`fullPage`

- is optional
- type: `boolean`

##### fullPage Type

`boolean`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value        | Description |
| ------------ | ----------- |
| `screenshot` |             |

#### Option 8

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `meta`   | object | Optional |
| `type`   | string | Optional |
| `url`    | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `goto` |             |

#### url

`url`

- is optional
- type: `string`

##### url Type

`string`

#### Option 9

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

form に入力されている内容を clear する

##### example

```yaml
- action:
    type: clear
    selector: 'input[name="name"]'
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `meta`     | object | Optional |
| `selector` | string | Optional |
| `type`     | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `clear` |             |

#### Option 10

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `dump` |             |

## precondition

main の action(steps)を実行する前に実行する action. login 処理などで用いる.

##### example

```yaml
name: login
iteration: 1
url: http://example.com
precondition:
  url: http://example.com/login
  steps:
    - action:
        type: input
        form:
          selector: 'input[name="email"]'
          value: "test@test.com"
    - action:
        type: input
        form:
          selector: 'input[name="password"]'
          value: "password"
    - action:
        type: click
        selector: "button"
        navigation: true
steps:
  - action:
      type: ....
```

`precondition`

- is optional
- type: `object`
- defined in this schema

### precondition Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `steps`  | array  | Optional |
| `url`    | string | Optional |

#### steps

ction を記述する.

`steps`

- is optional
- type: `array`

##### steps Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

input type=form, date もしくは textarea に対する入力を行う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="email"]'
      constrains:
        regexp: '([a-z]|[0-9]){5,10}@test\.com'
- action:
    type: input
    form:
      selector: 'input[name="name"]'
      value: "name"
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |
| `value`      |        | Optional |

#### constrains

value か constrains のどちらか片方しか指定できない. 任意の文字列を入力したい場合は value を, 与えた正規表現から任意の文
字列を入力したい場合は constraints を使う

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `regexp`   | string  | Optional |
| `required` | boolean | Optional |

#### regexp

正規表現を満たすような文字列を自動で出力する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="email"]'
      constrains:
        regexp: '([a-z]|[0-9]){5,10}@test\.com'
```

`regexp`

- is optional
- type: `string`

##### regexp Type

`string`

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### selector

css selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### value

value か constrains のどちらか片方しか指定できない. 任意の文字列を入力したい場合は value を, 与えた正規表現から任意の文
字列を入力したい場合は constraints を使う

`value`

- is optional
- type: complex

##### value Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `faker`  | string | Optional |

#### faker

[faker](https://www.npmjs.com/package/faker) を使う時に使用する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="address"]'
      value:
        faker: address.city
```

`faker`

- is optional
- type: `string`

##### faker Type

`string`

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `date`   | string | Optional |

#### date

input type="date"に入力する場合に使う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="birthday"]'
      value:
        date: "1989-04-01"
```

`date`

- is optional
- type: `string`

##### date Type

`string`

#### Option 3

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `input` |             |

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

HTML の element を click する

##### example

```yaml
- action:
    type: click
    selector: 'button[name="applyButton"]'
    navigation: true
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property       | Type    | Required |
| -------------- | ------- | -------- |
| `emulateMouse` | boolean | Optional |
| `meta`         | object  | Optional |
| `navigation`   | boolean | Optional |
| `selector`     | string  | Optional |
| `type`         | string  | Optional |

#### emulateMouse

Chrome only 指定された element の座標の上で mouse の click イベントを発火させる.

`emulateMouse`

- is optional
- type: `boolean`

##### emulateMouse Type

`boolean`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### navigation

Chome only link をクリックする際に使う. page の navigation が発生するまで wait する.

##### example

```yaml
- action:
    type: click
    selector: 'button[name="applyButton"]'
    navigation: true
```

`navigation`

- is optional
- type: `boolean`

##### navigation Type

`boolean`

#### selector

css selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `click` |             |

#### Option 3

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

Select Box を操作する action values で指定した中からランダムに選ばれる

##### example

```yaml
- action:
    type: select
    form:
      selector: 'select[name="prefecture"]'
      constrains:
        values:
          - 1
          - 2
          - 3
          - 4
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |

#### constrains

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `required` | boolean | Optional |
| `values`   | array   | Optional |

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### values

`values`

- is optional
- type: `array`

##### values Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `faker`  | string | Optional |

#### faker

[faker](https://www.npmjs.com/package/faker) を使う時に使用する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="address"]'
      value:
        faker: address.city
```

`faker`

- is optional
- type: `string`

##### faker Type

`string`

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `date`   | string | Optional |

#### date

input type="date"に入力する場合に使う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="birthday"]'
      value:
        date: "1989-04-01"
```

`date`

- is optional
- type: `string`

##### date Type

`string`

#### Option 3

`string`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `select` |             |

#### Option 4

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

duration(ms)の間 Sleep する action

##### example

```yaml
- action:
    type: wait
    duration: 1000
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `duration` | number | Optional |
| `meta`     | object | Optional |
| `name`     | string | Optional |
| `type`     | string | Optional |

#### duration

`duration`

- is optional
- type: `number`

##### duration Type

`number`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `wait` |             |

#### Option 5

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

url の location がパラメータで与えられたものかどうかをチェックする

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `location` | object | Optional |
| `meta`     | object | Optional |
| `name`     | string | Optional |
| `type`     | string | Optional |

#### location

`location`

- is optional
- type: `object`

##### location Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `regexp` | string | Optional |
| `value`  | string | Optional |

#### regexp

`regexp`

- is optional
- type: `string`

##### regexp Type

`string`

#### value

`value`

- is optional
- type: `string`

##### value Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `ensure` |             |

#### Option 6

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

input type="radio" の操作に使用する

##### example

```yaml
- action:
    type: radio
    form:
      selector: 'input[name="radio-check"]'
      value: false
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |
| `value`      | string | Optional |

#### constrains

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `required` | boolean | Optional |

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### value

`value`

- is optional
- type: `string`

##### value Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `radio` |             |

#### Option 7

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

Screenshot を取得する Action `[browser名]-[timestamp]-[name].png` というファイル名で screenshot を書き出す

##### example

```yaml
- action:
    type: screenshot
    name: filename
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `fullPage` | boolean | Optional |
| `meta`     | object  | Optional |
| `name`     | string  | Optional |
| `type`     | string  | Optional |

#### fullPage

`fullPage`

- is optional
- type: `boolean`

##### fullPage Type

`boolean`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value        | Description |
| ------------ | ----------- |
| `screenshot` |             |

#### Option 8

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `meta`   | object | Optional |
| `type`   | string | Optional |
| `url`    | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `goto` |             |

#### url

`url`

- is optional
- type: `string`

##### url Type

`string`

#### Option 9

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

form に入力されている内容を clear する

##### example

```yaml
- action:
    type: clear
    selector: 'input[name="name"]'
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `meta`     | object | Optional |
| `selector` | string | Optional |
| `type`     | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `clear` |             |

#### Option 10

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `dump` |             |

#### url

最初にブラウザで開く URL

`url`

- is optional
- type: `string`

##### url Type

`string`

## skip

`true` のとき当該のファイルのシナリオの実行を skip する

`skip`

- is optional
- type: `boolean`
- defined in this schema

### skip Type

`boolean`

## steps

main の scenario を記述する. iteration が指定されている場合は, この中を繰り返す.

`steps`

- is optional
- type: `array`
- defined in this schema

### steps Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

input type=form, date もしくは textarea に対する入力を行う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="email"]'
      constrains:
        regexp: '([a-z]|[0-9]){5,10}@test\.com'
- action:
    type: input
    form:
      selector: 'input[name="name"]'
      value: "name"
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |
| `value`      |        | Optional |

#### constrains

value か constrains のどちらか片方しか指定できない. 任意の文字列を入力したい場合は value を, 与えた正規表現から任意の文
字列を入力したい場合は constraints を使う

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `regexp`   | string  | Optional |
| `required` | boolean | Optional |

#### regexp

正規表現を満たすような文字列を自動で出力する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="email"]'
      constrains:
        regexp: '([a-z]|[0-9]){5,10}@test\.com'
```

`regexp`

- is optional
- type: `string`

##### regexp Type

`string`

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### selector

css selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### value

value か constrains のどちらか片方しか指定できない. 任意の文字列を入力したい場合は value を, 与えた正規表現から任意の文
字列を入力したい場合は constraints を使う

`value`

- is optional
- type: complex

##### value Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `faker`  | string | Optional |

#### faker

[faker](https://www.npmjs.com/package/faker) を使う時に使用する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="address"]'
      value:
        faker: address.city
```

`faker`

- is optional
- type: `string`

##### faker Type

`string`

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `date`   | string | Optional |

#### date

input type="date"に入力する場合に使う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="birthday"]'
      value:
        date: "1989-04-01"
```

`date`

- is optional
- type: `string`

##### date Type

`string`

#### Option 3

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `input` |             |

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

HTML の element を click する

##### example

```yaml
- action:
    type: click
    selector: 'button[name="applyButton"]'
    navigation: true
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property       | Type    | Required |
| -------------- | ------- | -------- |
| `emulateMouse` | boolean | Optional |
| `meta`         | object  | Optional |
| `navigation`   | boolean | Optional |
| `selector`     | string  | Optional |
| `type`         | string  | Optional |

#### emulateMouse

Chrome only 指定された element の座標の上で mouse の click イベントを発火させる.

`emulateMouse`

- is optional
- type: `boolean`

##### emulateMouse Type

`boolean`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### navigation

Chome only link をクリックする際に使う. page の navigation が発生するまで wait する.

##### example

```yaml
- action:
    type: click
    selector: 'button[name="applyButton"]'
    navigation: true
```

`navigation`

- is optional
- type: `boolean`

##### navigation Type

`boolean`

#### selector

css selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `click` |             |

#### Option 3

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

Select Box を操作する action values で指定した中からランダムに選ばれる

##### example

```yaml
- action:
    type: select
    form:
      selector: 'select[name="prefecture"]'
      constrains:
        values:
          - 1
          - 2
          - 3
          - 4
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |

#### constrains

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `required` | boolean | Optional |
| `values`   | array   | Optional |

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### values

`values`

- is optional
- type: `array`

##### values Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `faker`  | string | Optional |

#### faker

[faker](https://www.npmjs.com/package/faker) を使う時に使用する.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="address"]'
      value:
        faker: address.city
```

`faker`

- is optional
- type: `string`

##### faker Type

`string`

#### Option 2

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `date`   | string | Optional |

#### date

input type="date"に入力する場合に使う.

##### example

```yaml
- action:
    type: input
    form:
      selector: 'input[name="birthday"]'
      value:
        date: "1989-04-01"
```

`date`

- is optional
- type: `string`

##### date Type

`string`

#### Option 3

`string`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `select` |             |

#### Option 4

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

duration(ms)の間 Sleep する action

##### example

```yaml
- action:
    type: wait
    duration: 1000
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `duration` | number | Optional |
| `meta`     | object | Optional |
| `name`     | string | Optional |
| `type`     | string | Optional |

#### duration

`duration`

- is optional
- type: `number`

##### duration Type

`number`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `wait` |             |

#### Option 5

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

url の location がパラメータで与えられたものかどうかをチェックする

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `location` | object | Optional |
| `meta`     | object | Optional |
| `name`     | string | Optional |
| `type`     | string | Optional |

#### location

`location`

- is optional
- type: `object`

##### location Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `regexp` | string | Optional |
| `value`  | string | Optional |

#### regexp

`regexp`

- is optional
- type: `string`

##### regexp Type

`string`

#### value

`value`

- is optional
- type: `string`

##### value Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `ensure` |             |

#### Option 6

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

input type="radio" の操作に使用する

##### example

```yaml
- action:
    type: radio
    form:
      selector: 'input[name="radio-check"]'
      value: false
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `form`   | object | Optional |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### form

`form`

- is optional
- type: `object`

##### form Type

`object` with following properties:

| Property     | Type   | Required |
| ------------ | ------ | -------- |
| `constrains` | object | Optional |
| `selector`   | string | Optional |
| `value`      | string | Optional |

#### constrains

`constrains`

- is optional
- type: `object`

##### constrains Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `required` | boolean | Optional |

#### required

`required`

- is optional
- type: `boolean`

##### required Type

`boolean`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### value

`value`

- is optional
- type: `string`

##### value Type

`string`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `radio` |             |

#### Option 7

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

Screenshot を取得する Action `[browser名]-[timestamp]-[name].png` というファイル名で screenshot を書き出す

##### example

```yaml
- action:
    type: screenshot
    name: filename
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type    | Required |
| ---------- | ------- | -------- |
| `fullPage` | boolean | Optional |
| `meta`     | object  | Optional |
| `name`     | string  | Optional |
| `type`     | string  | Optional |

#### fullPage

`fullPage`

- is optional
- type: `boolean`

##### fullPage Type

`boolean`

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value        | Description |
| ------------ | ----------- |
| `screenshot` |             |

#### Option 8

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `meta`   | object | Optional |
| `type`   | string | Optional |
| `url`    | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `goto` |             |

#### url

`url`

- is optional
- type: `string`

##### url Type

`string`

#### Option 9

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

form に入力されている内容を clear する

##### example

```yaml
- action:
    type: clear
    selector: 'input[name="name"]'
```

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property   | Type   | Required |
| ---------- | ------ | -------- |
| `meta`     | object | Optional |
| `selector` | string | Optional |
| `type`     | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### selector

`selector`

- is optional
- type: `string`

##### selector Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value   | Description |
| ------- | ----------- |
| `clear` |             |

#### Option 10

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `action` | object | Optional |

#### action

`action`

- is optional
- type: `object`

##### action Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `meta`   | object | Optional |
| `type`   | string | Optional |

#### meta

`meta`

- is optional
- type: `object`

##### meta Type

`object` with following properties:

| Property | Type   | Required |
| -------- | ------ | -------- |
| `name`   | string | Optional |
| `tag`    | string | Optional |

#### name

`name`

- is optional
- type: `string`

##### name Type

`string`

#### tag

`tag`

- is optional
- type: `string`

##### tag Type

`string`

#### type

`type`

- is optional
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value  | Description |
| ------ | ----------- |
| `dump` |             |

## url

最初にブラウザで開く URL. precondition が設定されている場合は, precondition の実行終了時に遷移する.

`url`

- is optional
- type: `string`
- defined in this schema

### url Type

`string`
