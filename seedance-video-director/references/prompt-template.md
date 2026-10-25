# Template Seedance — mặc định mục tiêu dựng 15 giây

Điền theo brief hoặc reference thực. Bỏ phần không áp dụng, không giao dấu ngoặc giữ chỗ. Dùng thời lượng khác nếu người dùng nêu. Không mặc định 15s native khi chưa kiểm tra entry/model.

```text
Create a [genre and art style] video for a target edited duration of 15 seconds.
[Use the supplied reference only for its declared role, if one exists.]

Subjects: [distinct identities, appearance, proportions, wardrobe or object structure].
Environment: [location, time, lighting and world rules].
Opening state: [clear event or action consistent with the actual starting image, when used].
[Time window]: [primary action, anticipation, contact or visible cause].
[Time window]: [continuous action, momentum and reactions].
Ending state: [visible completion and a readable payoff].

Camera: [framing, one main movement, screen direction and continuity].
Lighting: [source and consistency].
Sound: [requested ambience, Foley, music and dialogue only when applicable].
Continuity: [identity, proportions, object ownership and spatial relationships].
Avoid [specific failure modes relevant to this shot].
```

Không yêu cầu ảnh nếu người dùng làm Text-to-Video. Có ảnh thì khóa tỷ lệ theo ảnh, không tự đặt số đo. Nếu native audio chưa được xác minh, chuyển âm thanh thành ghi chú hậu kỳ. Không đưa @image slot, negative field, seed, extend hoặc cấu hình giả vào prompt. Một prompt hoàn chỉnh đủ sao chép, không bắt người dùng ghép nhiều mảnh.
