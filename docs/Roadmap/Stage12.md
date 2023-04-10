---
title: "Stage 12: Join on Relations"
---

# Stage 12: Join on Relations (10 hours)

:::note Learning Objectives

- Implement the equi-join operation between relations in NITCbase

:::

## Introduction

The join operation is used to combine two relations with respect to a condition on two columns from the respective relations. NITCbase allows us to combine two relations into a new relation with the `=` condition. This is called an [equijoin](https://en.wikipedia.org/wiki/Relational_algebra#%CE%B8-join_and_equijoin).

NITCbase also allows you to do a combination of join and project operations together in a single command to create a new target relation with the specified attributes from both relations.

The associated commands are specified below. Read the documentation for these commands by clicking on the respective links.

| Frontend User Interface Command                                                                                                                              | Operation      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| [SELECT \* FROM Rel1 JOIN Rel2 INTO TargetRel WHERE Rel1.Attr1 = Rel2.Attr2](../User%20Interface%20Commands/dml.md#select--from-join-where)                  | join           |
| [SELECT Attr1,Attr2 FROM Rel1 JOIN Rel2 INTO TargetRel WHERE Rel1.Attr1 = Rel2.Attr2](../User%20Interface%20Commands/dml.md#select-attrlist-from-join-where) | join + project |

<br/>
<details>
<summary>

Q. Consider we have a relation `Events` with the attributes (`id`: NUM, `title`: STR, `location`: STR) and a relation `Locations` with the attributes name(`name`: STR, `capacity`: NUM). We run the following commands in NITCbase.

```sql
OPEN TABLE Events;
SELECT * FROM Events INTO Lectures WHERE location=ELHC;
OPEN TABLE Locations;
OPEN TABLE Lectures;
SELECT title, location, capacity FROM Lectures JOIN Locations INTO LectureCapacities WHERE Lectures.location = Locations.name;
```

1. What are the attribute cache entries for the relation `LectureCapacities`?
2. Suppose we add a relation `Participants` with attributes (`regNo`: NUM, `eventTitle`: STR). Write commands to filter the `regNo` of all the participants who are attending events happening in the location `Auditorium`.

(click to view answer)

</summary>

**Answer**

1. | RelName            | AttributeName | AttributeType | PrimaryFlag | RootBlock | Offset |
   | ------------------ | ------------- | ------------- | ----------- | --------- | ------ |
   | Lecture Capacities | title         | STR           | -           | -1        | 0      |
   | Lecture Capacities | location      | STR           | -           | -1        | 1      |
   | Lecture Capacities | capacity      | NUM           | -           | -1        | 2      |

2. ```sql
   OPEN TABLE Events;
   OPEN TABLE Participants;
   SELECT regNo, location FROM Participants JOIN Events INTO ParticipantLocations WHERE Participants.eventTitle = Events.title;
   OPEN TABLE ParticipantLocations;
   SELECT regNo FROM ParticipantLocations INTO AuditoriumParticipants WHERE location=Auditorium;
   ```

</details>

## Implementation
