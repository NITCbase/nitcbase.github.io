---
sidebar_position: 5
title: "Test Commands"
---

Test commands are provided to the student for educational purposes. It allows for the possiblity of adding any functionality as required by the student or an evaluator.

### Function

#### Description

This command is used as a generic function that passes all the arguments to the Frontend Programming Interface for further handling. This can be used to implement any functionality that is not already provided by NITCbase.

#### Syntax

```
FUNCTION <arg1> <arg2> <arg3> ...
```

:::info

- The FUNCTION command passes all entered tokens to [`Frontend::custom_function()`](../Design/Frontend.md#frontend--custom_function) for further processing.
- The entered arguments are considered delimited by whitespace and comma.

:::

:::note Example

Consider the following command

```sql
FUNCTION DeleteAttrs Toys name,colours
```

This will be transferred to [`Frontend::custom_function()`](../Design/Frontend.md#frontend--custom_function) with the following arguments.

```
argc = 4
argv = {"DeleteAttrs", "Toys", "name", "colours"}
```

:::
