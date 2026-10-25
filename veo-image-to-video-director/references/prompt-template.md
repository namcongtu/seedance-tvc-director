# Template — điền theo ảnh và nền tảng thực tế

Không sao chép các ngoặc vuông khi giao prompt hoàn chỉnh. Ràng buộc chỉ cần thiết cho trường hợp đang làm.

```text
Create [shot structure] for a target edited duration of [duration].
Use the supplied [prepared starting image / verified reference mode] as the visual source.

Preserve [visible character, clothing, object shape, materials, colors, environment and lighting].
Match the object's size relative to the hand exactly as shown in the reference. Keep its geometry and physical dimensions unchanged throughout the shot. A close camera view must not change its real size.

Opening state: [physically possible state matching the actual first frame].
[Time window]: [one visible action, point of contact, force and resulting state].
[Time window]: [next action with continuous object ownership].
Ending state: [completion visible before clip ends].

Camera: [one main move, perspective, start/end framing, then stability during contact].
Lighting: [consistent source and direction].
Sound: [only requested/assumed mode; no dialogue unless provided].
Continuity: [count, anatomy, proportions, object identity, hand ownership, motion direction].
Avoid [specific high-risk failure modes, without incompatible requirements].
```

Với model không có native audio đã xác minh: đưa âm thanh ra ghi chú hậu kỳ, không khẳng định prompt sẽ tạo được âm thanh. Khi chưa xác minh 10s, nói rõ ở phần Việt “thời lượng dựng mục tiêu” và không thêm tham số native bịa. Bản một prompt nên ngắn vừa đủ, tránh lặp scale lock trong mọi câu; negative chỉ bổ trợ mô tả hình học và tương tác đúng.
