---
name: viet-cau-chu
description: Viết và rà câu chữ tiếng Việt cho sản phẩm và content — chữ trong giao diện (nút, lỗi, trạng thái rỗng, tiêu đề), trang giới thiệu, bài đăng mạng xã hội, tít ảnh/video, báo cáo và tin nhắn gửi người khác. Gồm luật sàn rút từ lỗi thật: tiếng Việt thường thay thuật ngữ, không con số bịa, cấm "nhất/duy nhất/số một" theo Luật Quảng cáo, ngắt dòng tít đúng cụm, sửa số liệu mà giữ giọng, báo cáo trả lời "xong chưa · ở đâu · link nào". Dùng khi nói "viết lại cho dễ hiểu", "rà câu chữ", "viết content", "viết caption", "viết bài giới thiệu", "chữ trên nút/lỗi", "copy landing page", "báo cáo cho sếp/khách", "đọc không hiểu". Đi cặp với skill thiet-ke-giao-dien.
---

# Viết và rà câu chữ tiếng Việt

Câu hỏi đầu tiên luôn là: **ai đọc, họ cần biết gì, đọc xong họ làm gì.** Chữ đúng mà người đọc không hiểu là chữ hỏng.

## 1. Người đọc trước, thuật ngữ sau

- Viết bằng tiếng Việt thường. Thuật ngữ đúng nhưng người đọc không hiểu thì vô dụng: "VET · TAFE · Diploma theo khung AQF" phải thành "học nghề, ra làm đầu bếp, học 2 năm".
- Tên cơ quan hay khái niệm: nói nó **làm gì**, viết tắt để trong ngoặc **một lần**: "cơ quan đăng ký hành nghề y tế (AHPRA)".
- Không đưa mã nội bộ cho người ngoài: mã bài 19 chữ số, tên tệp, đường dẫn, dòng lệnh, `HTTP 400 tại https://…`. Dịch lỗi sang câu: "Instagram không nhận video (lỗi 400)".
- Ngày viết `25/09 14:00`, không viết `2026-09-25 14:00:00`. Số kiểu Việt: `44.317`, `25,6%`.
- Dữ liệu do máy thu về (cào web, AI tóm tắt) thường đầy mã và tên tiếng Anh: luôn có một lượt "viết lại tiếng Việt" trước khi đưa lên.

## 2. Chữ trong giao diện

- **Nút gọi đúng hành động** sẽ xảy ra: "Tra cứu văn bản", "Gửi câu hỏi", "Xem đầy đủ điều này". Không dùng "OK", "Xác nhận" chung chung.
- **Không có nút ngõ cụt.** "Đăng nhập" khi chưa có đăng nhập, "Đặt lịch demo" trỏ tới chỗ không có biểu mẫu: bỏ, hoặc đổi thành hành động có thật. Thứ chưa làm ghi chữ thường "Sắp ra mắt", đừng dựng thành nút.
- **Lỗi = chuyện gì hỏng + làm gì tiếp:** "Không tải được dữ liệu. Máy chủ đang bận hoặc mất kết nối, thử lại sau ít giây." Không dùng "Đã xảy ra lỗi".
- **Rỗng = dạy cách thử khác:** "Không có văn bản phù hợp. Thử bỏ bớt bộ lọc, gõ số hiệu đầy đủ (ví dụ 145/2020/NĐ-CP) hoặc từ khoá ngắn hơn." Không dùng mỗi chữ "Không có kết quả".
- **Đang tải:** nói đang làm gì ("Đang tìm trong kho văn bản…"), không chỉ hiện một vòng xoay.
- **Tiêu đề mang nghĩa, không mang mã:** "Hướng dẫn một số điều của Luật bảo hiểm xã hội về bảo hiểm xã hội tự nguyện" đứng trên, "Nghị định 190/2007/NĐ-CP" xuống dòng phụ.
- Ô nhập có ví dụ thật trong placeholder ("Ví dụ: người lao động thử việc tối đa bao nhiêu ngày?").
- Một khái niệm, một tên gọi trong toàn sản phẩm. Đã gọi "văn bản" thì đừng chỗ khác gọi "tài liệu".

## 3. Content giới thiệu và quảng bá

- **Không số bịa, không số "đẹp nhưng sai".** Con số trên trang phải đúng trên **bản live**. Ví dụ đã sửa: ghi "< 1 giây" trong khi thực tế 2–4 giây, phải thay bằng con số đọc thẳng từ dữ liệu.
- **Không logo khách hàng, không lời khen, không đánh giá bịa.** Chưa có thì để trống, đừng dựng cho "trông như thật".
- **Luật Quảng cáo (Điều 8 khoản 11):** cấm "nhất", "duy nhất", "tốt nhất", "số một", "hàng đầu" khi không có tài liệu hợp pháp chứng minh. Thay bằng **dữ kiện kiểm được**: năm thành lập, số dự án, quy mô cụ thể. Nguồn hay cài sẵn bẫy: công ty tự xưng "lớn nhất" trên web của họ, chép nguyên văn là dính.
  ```bash
  grep -noiE "(lớn|tốt|cao|đầu|duy|rẻ|nhanh|mạnh|uy tín)[^.;,]{0,12}nhất|số một|hàng đầu" <tệp>
  ```
- **Không nhãn chữ nhỏ trên tiêu đề** ("SẢN PHẨM", "MỘT NỀN TẢNG"). Tiêu đề tự đứng được.
- Tiêu đề nói **lợi ích bằng chữ của người dùng**, câu phụ nói **cách làm** bằng dữ kiện: "Hỏi bằng tiếng Việt thường, nhận câu trả lời trích đúng điều khoản trong văn bản gốc, kèm số hiệu và tình trạng hiệu lực."
- Với lĩnh vực nhạy cảm (pháp lý, y tế, tài chính): luôn có một câu giới hạn trách nhiệm, ví dụ "Thông tin tham khảo, không thay thế tư vấn của luật sư."

## 4. Tít trên ảnh, video, carousel: ngắt dòng đúng cụm

- Mỗi dòng (trừ dòng cuối) phải kết thúc ở **ranh giới cụm**: hoặc bằng dấu câu (`,` `:` `;` `—`), hoặc bằng một từ đủ nghĩa.
- **Cấm kết dòng bằng hư từ:** không, tự, chưa, đã, phải, được, của, và, hoặc, để, theo, cho, với, trong, là, có, các, những, một…
- **Không tách số khỏi vật nó đếm:** "5 diện", "12 tháng", "Diện 10 năm" phải nằm cùng dòng. Nối bằng `&nbsp;` cho MỌI cụm không được tách, không chỉ một cụm (nếu không, chỗ ngắt nhảy sang cụm chưa nối).
- Ba dòng ngắt đúng tốt hơn hai dòng cắt giữa cụm. Muốn ít dòng thì **rút chữ**, đừng ngắt bừa.
- Kiểm bằng mắt trên ảnh đã dựng xong, không tin mỗi số ký tự.

## 5. Sửa số liệu mà giữ giọng

- Thấy câu sai thì đọc **cả đoạn quanh nó** để bắt giọng (xưng hô "bạn" hay "anh chị", nhịp câu, lối ví von) rồi viết câu mới theo đúng nhịp đó.
- Số liệu mới **kể ra**, đừng **liệt kê** kiểu bảng tra. Đúng số mà mất giọng là hỏng sản phẩm.

## 6. Báo cáo và tin nhắn gửi người khác

- Mỗi tin trả lời được ba câu: **xong chưa · ở đâu · xem ở link nào.**
- Câu đầu là kết luận. Chi tiết kỹ thuật để trong tệp nhật ký, tin nhắn chỉ trỏ tới đó.
- Không gửi tin "không có gì" trông như có sự cố. Không lặp lại cùng một khối cảnh báo trong mọi tin.
- Không dán lệnh cho người không chạy lệnh. Viết "muốn huỷ thì nhắn".
- **Con số tròn bằng cỡ trang** (10, 20, 25, 30, 50, 100) là dấu hiệu mới đọc **một trang**: đi tìm tổng thật ("1–30/khoảng 182") rồi mới báo. Không có tổng thì ghi rõ "chưa xác nhận".

## 7. Thư, hồ sơ, giới thiệu bản thân

- Chỉ nêu điều **có thật và liên quan**. Không có câu kiểu "chưa làm X", "chưa có kinh nghiệm X", "sẵn sàng học X". Người ta không hỏi thì không tự khai điểm yếu.
- Vẫn tuyệt đối không bịa kinh nghiệm, công cụ, số năm, chứng chỉ. Bị hỏi thẳng thì trả lời đúng sự thật.

## Kiểm trước khi đưa ra

1. Đọc to một lượt **như người đọc thật**: họ có hiểu ngay không, có chữ nào phải tra không?
2. Chạy `grep` chữ "nhất" ở trên; tìm mã nội bộ còn sót (`grep -nE "[A-Z]{2,}[-_][0-9]|https?://|\\\\|\.py|\.json"`).
3. Mọi con số: chỉ được ra nguồn (dữ liệu, API, văn bản gốc)? Có đúng trên bản live không?
4. Mọi nút: bấm thử, có dẫn tới chỗ có thật không?
5. Tít trên ảnh: xem ảnh đã dựng, dòng nào kết bằng hư từ hoặc tách số?
