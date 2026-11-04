---
name: thiet-ke-giao-dien
description: Rà và nâng giao diện web (ứng dụng, dashboard, trang giới thiệu) cho "đàng hoàng" theo một quy trình có bằng chứng — chụp mọi trạng thái trên máy tính và điện thoại TRƯỚC khi sửa, xếp lỗi theo mức nặng, sửa theo lô, chụp lại một vòng, rồi mới đưa lên. Kèm bộ luật sàn rút từ dự án thật (TraLuật, tra cứu pháp luật) và công cụ chụp chup.mjs không cần Puppeteer. Dùng khi nói "coi lại UI/UX", "làm cho đàng hoàng", "polish giao diện", "rà giao diện", "sửa cho đẹp", "kiểm responsive", "mockup trông nghiệp dư", "trước khi đưa demo cho khách". Đi cặp với skill impeccable (pbakaus/impeccable) nếu đã cài.
---

# Rà và nâng giao diện web

Mục tiêu: giao diện mà người dùng thật tin ngay, không phải dừng lại ở từng chỗ "hơi sai". Đẹp là phần thưởng sau khi mọi đường đi đều chạy đúng.

## 0. Công cụ đi kèm

- **impeccable** (khuyên cài; Apache 2.0, của pbakaus): `npx skills add pbakaus/impeccable`, hoặc trong Claude Code `/plugin marketplace add pbakaus/impeccable` rồi cài từ thẻ Discover. Nếu đã cài: gọi skill `impeccable` với lệnh `polish` (rà và sửa) hoặc `critique` (chỉ chấm điểm), và chạy bộ dò `detect` MỘT lần ở cuối.
- **`cong-cu/chup.mjs`** (trong thư mục skill này): chụp từng trạng thái qua Chrome DevTools Protocol, chỉ cần Node ≥ 22 và Chrome. Khai báo cảnh trong một tệp JSON (xem `cong-cu/canh-mau.json`):
  ```bash
  node <thư-mục-skill>/cong-cu/chup.mjs http://127.0.0.1:8000 ./anh-truoc ./canh.json
  ```
  Nó in `TRÀN NGANG` khi trang rộng hơn màn hình (lỗi điện thoại hay gặp nhất). Chrome chạy hồ sơ tạm riêng, cổng 9481 (đổi bằng `CHUP_PORT`), không đụng Chrome đang mở.

## 1. Thu bằng chứng trước khi sửa

1. Đọc hết mã các trang liên quan: HTML/CSS/JS, và API trả gì. Không sửa dựa trên ảnh chụp.
2. Viết `canh.json` phủ **mọi trạng thái người dùng sẽ gặp**: trang trống, có kết quả, không có kết quả, lỗi mạng, khung chi tiết đang mở, nội dung dài nhất. Mỗi cảnh làm hai cỡ: **1440×900** và **390×844 (`mobile: true`)**.
3. Chụp "trước", rồi XEM từng ảnh. Đo cả tốc độ API trên **máy chủ thật** (`curl -w %{time_total}`): máy chủ yếu có thể chậm gấp 5 lần máy dev.

## 2. Xếp lỗi theo thứ tự (sửa đúng thứ tự này)

1. **Chức năng hỏng hoặc gây hiểu nhầm:** nút dẫn vào ngõ cụt, số liệu sai trên bản live, thao tác chậm tới mức tưởng là hỏng.
2. **Thiếu trạng thái:** đang tải, rỗng, lỗi, đang mở chi tiết.
3. **Bố cục và responsive:** rớt dòng, tràn ngang, khoảng trắng vô nghĩa.
4. **Thẩm mỹ:** màu, chữ, nhịp khoảng cách.

## 3. Luật sàn (rút từ lỗi thật đã sửa)

Chữ trên giao diện (nút, lỗi, rỗng, tiêu đề, số liệu, tít) theo skill **`viet-cau-chu`** đi cùng gói này.

**Nội dung thật**
- Không số liệu bịa hay "đẹp nhưng sai". Ví dụ đã sửa: trang ghi "< 1 giây" trong khi bản live mất 2–4 giây, phải thay bằng con số lấy thẳng từ API.
- Không logo khách hàng, không lời khen bịa.
- Tiêu đề phải mang nghĩa. Danh sách hiện "Nghị định 190/2007/NĐ-CP của Chính phủ" thì không ai biết văn bản nói gì; đổi sang trích yếu ("Hướng dẫn… bảo hiểm xã hội tự nguyện"), đưa số hiệu xuống dòng phụ.
- Đoạn trích: cắt ở ranh giới chữ, bỏ dòng gạch trang trí `_____`, không lặp lại tiêu đề đã hiện, gộp các từ khoá liền nhau thành một vệt tô.
- Toàn văn dài: gộp dòng trống liên tiếp, in đậm các mốc cấu trúc (Điều/Chương, hoặc mục tương đương).

**Không ngõ cụt**
- Mọi nút phải dẫn tới chỗ có thật. "Đăng nhập" khi chưa có đăng nhập, hay "Đặt lịch demo" trỏ tới một mục không có biểu mẫu, đều phải bỏ hoặc đổi thành hành động có thật ("Dùng thử").
- Thứ "sắp có" thì ghi bằng chữ thường, đừng dựng thành nút.

**Trạng thái**
- Đang tải: khung chờ (skeleton) đúng hình nội dung. Khung chi tiết **mở ngay** khi bấm rồi đổ dữ liệu vào sau, đừng bắt người dùng nhìn màn hình đứng yên 1–2 giây.
- Rỗng: một câu nói rõ không có gì, kèm cách thử khác (bỏ bộ lọc, gõ ngắn hơn, ví dụ cụ thể).
- Lỗi: bắt mọi `fetch`, hiện "Không tải được dữ liệu, thử lại sau ít giây". Không để trắng trang.
- Kết quả về muộn của lần bấm trước không được đè lên lần bấm sau (đánh số lượt, bỏ kết quả cũ).

**Truy cập và bàn phím**
- Phần tử bấm được phải là `<a href>` hoặc `<button>`, không dùng `div` có `onclick`.
- Có `:focus-visible` rõ ràng. Khung trượt hoặc hộp thoại: `role="dialog"`, Esc để đóng, giữ focus bên trong, trả focus về chỗ cũ khi đóng.
- Chữ phụ (màu xám) tương phản ≥ 4,5:1 trên MỌI nền nó nằm lên, kể cả các nhãn hình viên thuốc.
- Ô nhập và nút chỉ có biểu tượng phải có `aria-label`.

**Điện thoại**
- Hàng tab, menu, bộ lọc: cho **cuộn ngang** (`overflow-x:auto`, ẩn thanh cuộn), đừng để rớt thành nhiều dòng lộn xộn.
- Thẻ số liệu: lưới 2×2 thay vì xếp dọc từng thẻ.
- Tiêu đề dài: `-webkit-line-clamp` 3–4 dòng.
- Thanh điều hướng dính trên (`position: sticky`).

**Điều hướng**
- Mỗi màn có địa chỉ riêng (`/app#tim`, `/app#kho`…) để gửi link được và nút quay lại của trình duyệt hoạt động. Trang giới thiệu trỏ thẳng tới đúng màn.

**Hình thức**
- Một họ font là đủ cho giao diện sản phẩm; bậc cỡ chữ rõ ràng (bước ≥ 1,25 giữa tiêu đề và chữ thân).
- Màu khai báo thành biến (token); màu nhấn chỉ dùng cho hành động chính, mục đang chọn và trạng thái.
- Không nhãn chữ nhỏ viết hoa đặt phía trên tiêu đề. Không lấy cả trang làm lưới thẻ (biểu tượng + tiêu đề + đoạn chữ) giống hệt nhau; dùng danh sách có đường kẻ.
- Tô màu chữ chọn (`::selection`) theo bảng màu.
- Ảnh chụp giao diện trên trang giới thiệu phải là **ảnh của bản hiện tại**; sửa giao diện xong thì chụp lại.

**Hiệu năng cảm nhận** (thường bị gọi nhầm là "UI chậm")
- Đo từng API trên máy chủ thật. Ví dụ đã gặp: SQLite FTS5 đặt `snippet()` trong câu truy vấn có `ORDER BY bm25 … LIMIT 20`. SQLite tính đoạn trích cho MỌI dòng khớp (14.000 dòng) nên mất 13–29 giây. Sửa: bước 1 chỉ xếp hạng lấy `rowid`, bước 2 đọc 20 dòng đó và tự cắt đoạn trích, còn 0,2–0,6 giây. Luật chung: đừng đưa cột nặng vào truy vấn có `ORDER BY` + `LIMIT`.

## 4. Sửa, kiểm, dừng

1. Sửa **theo lô** toàn bộ danh sách ở mục 2, không sửa lắt nhắt từng cái rồi chụp.
2. Logic có nhánh (tách chuỗi, cắt trích, định dạng) thì để lại MỘT bài tự kiểm nhỏ chạy được (ví dụ cờ `--thu` dùng `assert`).
3. Chụp "sau" đúng bộ cảnh cũ, xem từng ảnh, sửa nốt trong **một** lô nữa. Tối đa hai vòng, rồi dừng.
4. Chạy bộ dò của impeccable **một lần** (`impeccable detect --json <tệp>`). Chỗ nào cố ý giữ (ví dụ ảnh hero tràn sát mép dưới) thì ghi lại lý do, đừng sửa cho im cảnh báo.

## 5. Đưa lên

- Sao lưu bản đang chạy trước khi đè.
- Bản demo chưa muốn lên Google: **noindex 3 lớp**, gồm header `X-Robots-Tag: noindex, nofollow` trên mọi phản hồi (cả 404), thẻ `<meta name="robots">`, và `/robots.txt` với `Disallow: /`.
- Sau CDN (Cloudflare…), ảnh tĩnh hay bị giữ bản cũ (`cf-cache-status: HIT`). Không xoá được bộ đệm thì thêm `?v=N` vào đường dẫn ảnh.
- Chụp lại ngay trên URL live bằng `chup.mjs`. Bằng chứng là ảnh của bản live, không phải "đã deploy xong".

## Ví dụ đã làm: TraLuật (tra cứu và hỏi đáp pháp luật)

| Trước | Sau |
|---|---|
| Danh sách chỉ ghi "Nghị định X của Chính phủ" | Trích yếu làm tiêu đề; số hiệu, cơ quan, ngày, hiệu lực ở dòng phụ |
| Đoạn trích lặp tên Điều, dính `_____`, cắt giữa chữ, tô rời từng chữ | Sạch, cắt đúng chữ, một vệt tô cho cả cụm |
| Tra cứu 13–29 giây | 2,5–3,7 giây trên VPS yếu (0,2–0,6 giây trên máy dev) |
| Khung đọc văn bản đứng im 1–2 giây, nhiều khoảng trắng | Mở ngay kèm khung chờ; in đậm Điều, tách Chương |
| Menu và bộ lọc điện thoại rớt dòng; 4 thẻ số xếp dọc | Cuộn ngang; lưới 2×2 |
| "Đăng nhập" và "Đặt lịch demo" không dẫn đi đâu; ghi "< 1 giây" | Bỏ nút ngõ cụt; số liệu lấy từ API |
| Không bấm được bằng bàn phím, không có trạng thái lỗi, chữ xám 3,3:1 | Focus rõ, giữ focus trong khung, báo lỗi, chữ xám 4,5:1 |
