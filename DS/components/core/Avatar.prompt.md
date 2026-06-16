User avatar (photo or auto-colored initials) and an `AvatarGroup` overlap stack with +N overflow.

```jsx
<Avatar name="Jamie Carter" />
<AvatarGroup max={3} people={[{name:'Jamie Carter'},{name:'Priya N'},{name:'Sam Lee'},{name:'Dana Vu'}]} />
```

Sizes: xs · sm · md · lg. `square` for rounded-rect.