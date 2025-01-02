import React, { useEffect, useState } from "react";
import { Icons } from "../../../constant/icon";
import { useModal } from "../../../context/modalContext";
import { useForm } from "react-hook-form";
import { useDeposit } from "../../../services/userService";
import toast from "../../../components/Shared/toast";
import Button from "../../../components/Ui/Button";
import commonService, {
  useGetCoin,
  usePackageCredit,
} from "../../../services/commonService";
import { validateEmail } from "../../../constant/Validate";
import logoPayment from "../../../assets/images/logo_payment.png";
import { CoinSelect } from "../../../components/Select/ModelSelect";
import { useUser } from "../../../context/AuthContext";
const PAYMENT_METHOD = {
  COINPAYMENTS: "COINPAYMENTS",
  VISA: "VISA",
  OTHER_CARD: "OTHER_CARD",
};
const Payment = () => {
  const { user } = useUser();
  const [all, setAll] = useState({
    total: "",
    tabPackageCredit: "",
    step: 1,
  });

  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 1,
      first_name: user?.full_name,
      email: user?.email,
      last_name: "",
      payment_method: PAYMENT_METHOD.COINPAYMENTS,
      currency: "LTCT",
    },
  });
  const data = watch();
  const { mutateAsync, isPending: isPendingDeposit } = useDeposit();
  const { data: dataPackageCredit, isLoading: isLoadingPackageCredit } =
    usePackageCredit();
  const { data: listCoin, isLoading: isLoadingListCoin } = useGetCoin();
  const onSubmit = async () => {
    const res = await mutateAsync({
      ...data,
      code: data?.code,
      amount: Number(watch().amount),
    });
    if (res.success) {
      window.location.href = res.data.request.checkout_url;
      localStorage.setItem("deposit", res.data.code);
      return;
    }
  };
  const onBack = () => {
    if (all.step === 1) {
      closeModal();
    } else {
      setAll((e) => ({
        ...e,
        step: e.step - 1,
      }));
    }
  };

  return (
    <div
      id="popup"
      style={{
        maxHeight: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="popup__body popup__coin-mobile medium">
        {all.step === 1 ? (
          <div className="popup__content ">
            <div className="popup-payment">
              <p className="popup-payment__ttl" style={{ fontSize: 24 }}>
                Payment options
              </p>
              <p className="popup-payment__txt">
                Please select one of the available payment options
              </p>
              <div
                className="js-select-payment popup-payment__input_quantity"
                style={{ marginBottom: "20px" }}
              >
                <p className="popup-payment__ttl">Input credit quantity</p>
                <div className="popup-payment__input">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      flex: 2,
                    }}
                  >
                    <input
                      type="number"
                      autoFocus={true}
                      tabIndex={1}
                      style={{
                        border: errors.password ? "1px solid red" : "",
                        outline: "none",
                        padding: 10,
                      }}
                      className="form-control"
                      placeholder="Your amount here"
                      {...register("amount", {
                        required: all.tabPackageCredit
                          ? false
                          : "Amount is required",
                        min: all.tabPackageCredit
                          ? undefined
                          : {
                              value: 1,
                              message: "Amount greater than 0",
                            },
                      })}
                      onChange={(e) => {
                        setValue("amount", e.target.value);
                        setAll((e) => ({
                          ...e,
                          tabPackageCredit: "",
                        }));
                      }}
                    />
                    <p
                      style={{
                        position: "absolute",
                        right: 10,
                        fontWeight: 500,
                        color: "#FFF",
                      }}
                    >
                      USD
                    </p>
                  </div>
                  <div className="equal">=</div>
                  <div className="text-token">
                    <p>{watch().amount * 100}</p>
                    <p>Credit</p>
                  </div>
                </div>

                {errors.amount && (
                  <p className="validate-message">{errors.amount.message}</p>
                )}
                <p className="popup-payment__ttl" style={{ marginTop: 10 }}>
                  Package
                </p>

                <div className="package-credit">
                  {dataPackageCredit?.data?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`package-box  ${
                          item?.code === all.tabPackageCredit ? "is-active" : ""
                        }`}
                        onClick={() => {
                          setValue("amount", 0);
                          setValue("code", item?.code);
                          setAll((e) => ({
                            ...e,
                            total: item?.usd_value,
                            tabPackageCredit: item?.code,
                          }));
                        }}
                      >
                        <p style={{ color: "#01c1cc" }}>
                          {item?.usd_value} USD
                        </p>
                        <p className="text-des-credit">
                          ({item?.credit_value} Credits)
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="popup-payment__list js-select-payment">
                {/* <label
                  className={`item ${
                    PAYMENT_METHOD.VISA === data.payment_method ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    setValue('payment_method', PAYMENT_METHOD.VISA);
                  }}
                >
                  <span className="check"></span>
                  <span className="ttl">Pay with my card on file</span>
                  <span className="image">
                    <span className="icon">
                      <img src={Icons.logo_visa_1} alt="images" />
                    </span>
                    <span className="txt">************ 4322</span>
                  </span>
                </label> */}
                {/* <label
                  className={`item ${
                    PAYMENT_METHOD.OTHER_CARD === data.payment_method ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    setValue('payment_method', PAYMENT_METHOD.OTHER_CARD);
                  }}
                > */}
                {/* <input type="radio" name="payment-01" /> */}
                {/* <span className="check"></span>
                  <span className="ttl">Pay with a different card</span>
                  <span className="image">
                    <img src={Icons.logo_visa_2} alt="images" />
                  </span>
                </label> */}
                <label
                  className={`item ${
                    PAYMENT_METHOD.COINPAYMENTS === data.payment_method
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() => {
                    setValue("payment_method", PAYMENT_METHOD.COINPAYMENTS);
                  }}
                  style={{ borderRadius: "1.2rem" }}
                >
                  {/* <input type="radio" name="payment-01" /> */}
                  <span className="check"></span>
                  <span className="ttl" style={{ color: "#FFF" }}>
                    CoinPayments
                  </span>
                  <span className="image">
                    <img src={Icons.logo_visa_3} alt="images" />
                  </span>
                </label>
              </div>

              <Button
                // disabled={!tabPackageCredit}
                loading={isLoadingPackageCredit}
                onClick={handleSubmit(() =>
                  setAll((e) => ({
                    ...e,
                    step: 2,
                  }))
                )}
                className="popup-form__btn"
                style={{ marginTop: "30px" }}
              >
                Continue
              </Button>
            </div>
          </div>
        ) : all.step === 2 ? (
          <div className="popup__content --larger">
            <div className="popup-payment">
              <p className="popup-payment__ttl" style={{ fontSize: 24 }}>
                Payment coin
              </p>
              <div className="flex flex-col gap-2">
                <ListCoin
                  setValue={setValue}
                  selected={data.currency}
                  listData={listCoin?.data}
                  isLoading={isLoadingListCoin}
                />
                <Button
                  loading={isLoadingListCoin}
                  onClick={handleSubmit(() =>
                    setAll((e) => ({
                      ...e,
                      step: 3,
                    }))
                  )}
                  className="popup-form__btn"
                  style={{ marginTop: 10 }}
                >
                  Continue
                </Button>
                <p className="payment-info__btn" onClick={onBack}>
                  <span tabIndex={2}>Cancel & Return</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="popup__content --larger">
            <div className="payment-info">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <p className="payment-info__ttl" style={{ fontSize: 24 }}>
                  Payment options
                </p>
                <p className="popup-payment__txt">
                  Please select one of the available payment options
                </p>
                <p className="payment-info__logo">
                  <img src={logoPayment} alt="Coin payment" />
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="billing-information">
                  <p className="payment-info__ttl">Billing Information</p>
                  <div className="payment-info__col">
                    <div className="item">
                      <p className="payment-info__input">
                        <img
                          src={Icons.icon_user}
                          alt="images"
                          style={{ position: "absolute", left: 5, top: 11 }}
                        />
                        <input
                          tabIndex={1}
                          className="form-control"
                          style={{
                            border: errors.first_name ? "1px solid red" : "",
                          }}
                          {...register("first_name", {
                            required: "First name is required",
                            maxLength: {
                              value: 30,
                              message:
                                "First name must not exceed 30 characters",
                            },
                          })}
                          type="text"
                          placeholder="First name"
                        />
                      </p>
                      {errors.first_name && (
                        <p className="validate-message">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="item">
                      <p className="payment-info__input">
                        <img
                          src={Icons.icon_user}
                          alt="images"
                          style={{ position: "absolute", left: 5, top: 11 }}
                        />
                        <input
                          tabIndex={2}
                          className="form-control"
                          style={{
                            border: errors.last_name ? "1px solid red" : "",
                          }}
                          {...register("last_name", {
                            required: "Last name is required",
                            maxLength: {
                              value: 30,
                              message:
                                "Last name must not exceed 30 characters",
                            },
                          })}
                          type="text"
                          placeholder="Last name"
                        />
                      </p>
                      {errors.last_name && (
                        <p className="validate-message">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="payment-info__row">
                    <p className="payment-info__input">
                      <img
                        src={Icons.icon_user}
                        alt="images"
                        style={{ position: "absolute", left: 5, top: 11 }}
                      />
                      <input
                        tabIndex={3}
                        style={{ border: errors.email ? "1px solid red" : "" }}
                        className="form-control"
                        type="text"
                        placeholder="yourname@gmail.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: validateEmail,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </p>
                    {errors.email && (
                      <p className="validate-message">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <p className="payment-info__ttl">Your Cart</p>
                <div className="payment-info__price">
                  <div className="item">
                    <div className="body">
                      <p className="ttl">
                        <strong>Total</strong>
                      </p>
                    </div>
                    <p
                      className="price --larger"
                      style={{ color: "#FFF", fontSize: 18 }}
                    >
                      ${watch().amount === 0 ? all.total : watch().amount}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    loading={isPendingDeposit}
                    onClick={handleSubmit(onSubmit)}
                    className="popup-form__btn "
                    style={{ marginTop: 10 }}
                  >
                    Complete check out
                  </Button>

                  <p className="payment-info__btn " onClick={onBack}>
                    <span tabIndex={4}>Cancel & Return</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
const ListCoin = ({ setValue, selected, listData, isLoading }) => {
  return (
    <div style={{ marginTop: 20, overflow: "hidden" }}>
      <>
        <CoinSelect
          listData={listData}
          setValue={(e) => {
            setValue("currency", e);
          }}
          value={selected}
          isLoading={isLoading}
        />
      </>
    </div>
  );
};
