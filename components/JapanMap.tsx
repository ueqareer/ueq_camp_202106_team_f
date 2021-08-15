import React from 'react';
import $ from 'jquery';
import utilStyles from '@/styles/utils.module.css';

const JapanMap = (props: { getPlace: (arg0: any) => void; }) => {
  //地域を選択
  $('.area_btn').click(function () {
    $('.area_overlay').show();
    $('.pref_area').show();
    const area = $(this).data('area');
    $('[data-list]').hide();
    $('[data-list="' + area + '"]').show();
  });

  //レイヤーをタップ
  $('.area_overlay').click(function () {
    prefReset();
  });

  //都道府県をクリック
  $('.pref_list [data-id]').click(function () {
    if ($(this).data('id')) {
      const id = $(this).data('id');
      props.getPlace(id)

      //このidを使用して行いたい操作をしてください      
      //都道府県IDに応じて別ページに飛ばしたい場合はこんな風に書く↓
      //window.location.href = 'https://kinocolog.com/pref/' + id;
      console.log(id);
      prefReset();
    }
  });

  //表示リセット
  const prefReset = () => {
    $('[data-list]').hide();
    $('.pref_area').hide();
    $('.area_overlay').hide();
  };

  return (
    <div className={utilStyles.inline}>
      <div className="japan_map">
        <img src="/japan.png" height={546} width={506} />
        <span className="area_btn area1" data-area="1">
          北海道・東北
        </span>
        <span className="area_btn area2" data-area="2">
          関東
        </span>
        <span className="area_btn area3" data-area="3">
          中部
        </span>
        <span className="area_btn area4" data-area="4">
          近畿
        </span>
        <span className="area_btn area5" data-area="5">
          中国・四国
        </span>
        <span className="area_btn area6" data-area="6">
          九州・沖縄
        </span>

        <div className="area_overlay" />
        <div className="pref_area">
          <div className="pref_list" data-list="1">
            <div data-id="1">北海道</div>
            <div data-id="2">青森県</div>
            <div data-id="3">岩手県</div>
            <div data-id="4">宮城県</div>
            <div data-id="5">秋田県</div>
            <div data-id="6">山形県</div>
            <div data-id="7">福島県</div>
            <div></div>
          </div>

          <div className="pref_list" data-list="2">
            <div data-id="8">茨城県</div>
            <div data-id="9">栃木県</div>
            <div data-id="10">群馬県</div>
            <div data-id="11">埼玉県</div>
            <div data-id="12">千葉県</div>
            <div data-id="13">東京都</div>
            <div data-id="14">神奈川県</div>
            <div></div>
          </div>

          <div className="pref_list" data-list="3">
            <div data-id="15">新潟県‎</div>
            <div data-id="16">富山県‎</div>
            <div data-id="17">石川県‎</div>
            <div data-id="18">福井県‎</div>
            <div data-id="19">山梨県‎</div>
            <div data-id="20">長野県‎</div>
            <div data-id="21">岐阜県</div>
            <div data-id="22">静岡県</div>
            <div data-id="23">愛知県‎</div>
            <div></div>
          </div>

          <div className="pref_list" data-list="4">
            <div data-id="24">三重県</div>
            <div data-id="25">滋賀県</div>
            <div data-id="26">京都府</div>
            <div data-id="27">大阪府</div>
            <div data-id="28">兵庫県</div>
            <div data-id="29">奈良県</div>
            <div data-id="30">和歌山県</div>
            <div></div>
          </div>

          <div className="pref_list" data-list="5">
            <div data-id="31">鳥取県</div>
            <div data-id="32">島根県</div>
            <div data-id="33">岡山県</div>
            <div data-id="34">広島県</div>
            <div data-id="35">山口県</div>
            <div data-id="36">徳島県</div>
            <div data-id="37">香川県</div>
            <div data-id="38">愛媛県</div>
            <div data-id="39">高知県</div>
            <div></div>
          </div>

          <div className="pref_list" data-list="6">
            <div data-id="40">福岡県</div>
            <div data-id="41">佐賀県</div>
            <div data-id="42">長崎県</div>
            <div data-id="43">熊本県</div>
            <div data-id="44">大分県</div>
            <div data-id="45">宮崎県</div>
            <div data-id="46">鹿児島県</div>
            <div data-id="47">沖縄県</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapanMap;
