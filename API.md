# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AdDecisionServer <a name="AdDecisionServer" id="awscdk-construct-ad-decision-server.AdDecisionServer"></a>

#### Initializers <a name="Initializers" id="awscdk-construct-ad-decision-server.AdDecisionServer.Initializer"></a>

```typescript
import { AdDecisionServer } from 'awscdk-construct-ad-decision-server'

new AdDecisionServer(scope: Construct, id: string, __2: AdDecisionServerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.Initializer.parameter.__2">__2</a></code> | <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServerProps">AdDecisionServerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="awscdk-construct-ad-decision-server.AdDecisionServer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="awscdk-construct-ad-decision-server.AdDecisionServer.Initializer.parameter.id"></a>

- *Type:* string

---

##### `__2`<sup>Required</sup> <a name="__2" id="awscdk-construct-ad-decision-server.AdDecisionServer.Initializer.parameter.__2"></a>

- *Type:* <a href="#awscdk-construct-ad-decision-server.AdDecisionServerProps">AdDecisionServerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="awscdk-construct-ad-decision-server.AdDecisionServer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="awscdk-construct-ad-decision-server.AdDecisionServer.isConstruct"></a>

```typescript
import { AdDecisionServer } from 'awscdk-construct-ad-decision-server'

AdDecisionServer.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="awscdk-construct-ad-decision-server.AdDecisionServer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServer.property.url">url</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="awscdk-construct-ad-decision-server.AdDecisionServer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `url`<sup>Required</sup> <a name="url" id="awscdk-construct-ad-decision-server.AdDecisionServer.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AdDecisionServerProps <a name="AdDecisionServerProps" id="awscdk-construct-ad-decision-server.AdDecisionServerProps"></a>

#### Initializer <a name="Initializer" id="awscdk-construct-ad-decision-server.AdDecisionServerProps.Initializer"></a>

```typescript
import { AdDecisionServerProps } from 'awscdk-construct-ad-decision-server'

const adDecisionServerProps: AdDecisionServerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServerProps.property.creatives">creatives</a></code> | <code><a href="#awscdk-construct-ad-decision-server.Creative">Creative</a>[]</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.AdDecisionServerProps.property.clearanceRule">clearanceRule</a></code> | <code>string</code> | *No description.* |

---

##### `creatives`<sup>Required</sup> <a name="creatives" id="awscdk-construct-ad-decision-server.AdDecisionServerProps.property.creatives"></a>

```typescript
public readonly creatives: Creative[];
```

- *Type:* <a href="#awscdk-construct-ad-decision-server.Creative">Creative</a>[]

---

##### `clearanceRule`<sup>Optional</sup> <a name="clearanceRule" id="awscdk-construct-ad-decision-server.AdDecisionServerProps.property.clearanceRule"></a>

```typescript
public readonly clearanceRule: string;
```

- *Type:* string

---

### Creative <a name="Creative" id="awscdk-construct-ad-decision-server.Creative"></a>

#### Initializer <a name="Initializer" id="awscdk-construct-ad-decision-server.Creative.Initializer"></a>

```typescript
import { Creative } from 'awscdk-construct-ad-decision-server'

const creative: Creative = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#awscdk-construct-ad-decision-server.Creative.property.delivery">delivery</a></code> | <code>string</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.Creative.property.duration">duration</a></code> | <code>number</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.Creative.property.height">height</a></code> | <code>number</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.Creative.property.mimeType">mimeType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.Creative.property.url">url</a></code> | <code>string</code> | *No description.* |
| <code><a href="#awscdk-construct-ad-decision-server.Creative.property.width">width</a></code> | <code>number</code> | *No description.* |

---

##### `delivery`<sup>Required</sup> <a name="delivery" id="awscdk-construct-ad-decision-server.Creative.property.delivery"></a>

```typescript
public readonly delivery: string;
```

- *Type:* string

---

##### `duration`<sup>Required</sup> <a name="duration" id="awscdk-construct-ad-decision-server.Creative.property.duration"></a>

```typescript
public readonly duration: number;
```

- *Type:* number

---

##### `height`<sup>Required</sup> <a name="height" id="awscdk-construct-ad-decision-server.Creative.property.height"></a>

```typescript
public readonly height: number;
```

- *Type:* number

---

##### `mimeType`<sup>Required</sup> <a name="mimeType" id="awscdk-construct-ad-decision-server.Creative.property.mimeType"></a>

```typescript
public readonly mimeType: string;
```

- *Type:* string

---

##### `url`<sup>Required</sup> <a name="url" id="awscdk-construct-ad-decision-server.Creative.property.url"></a>

```typescript
public readonly url: string;
```

- *Type:* string

---

##### `width`<sup>Required</sup> <a name="width" id="awscdk-construct-ad-decision-server.Creative.property.width"></a>

```typescript
public readonly width: number;
```

- *Type:* number

---



