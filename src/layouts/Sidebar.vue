<template>
        <!-- Sidebar main menu -->
    <div class="sidebar-wrap  sidebar-overlay">
        <!-- Add pushcontent or fullmenu instead overlay -->
        <div class="closemenu text-muted">Close Menu</div>
        <div class="sidebar">
            <div class="row">
                <div class="col-auto mx-auto text-center">
                    <figure class="avatar avatar-120 rounded-circle mx-auto mb-3">
                        <img src="assets/img/user1.jpg" alt="">
                    </figure>
                    <h6 class="mb-1">Ajinkya McMohan</h6>
                    <p class="text-muted">London, UK</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="index.html">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-house-door"></i></div>
                                <div class="col">Dashboard</div>
                                <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                            </a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                aria-expanded="false">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-shop"></i></div>
                                <div class="col">Shop</div>
                                <div class="arrow"><i class="bi bi-plus plus"></i> <i class="bi bi-dash minus"></i>
                                </div>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item nav-link" href="shop.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-bag"></i></div>
                                        <div class="col">Shop home</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="product.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-binoculars"></i></div>
                                        <div class="col">Product</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="cart.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-basket3"></i></div>
                                        <div class="col">Cart</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="payment.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-credit-card"></i></div>
                                        <div class="col">Payment</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="my-orders.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-box-seam"></i></div>
                                        <div class="col">My Orders</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                aria-expanded="false">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-calendar-check"></i></div>
                                <div class="col">Task ToDo</div>
                                <div class="arrow"><i class="bi bi-plus plus"></i> <i class="bi bi-dash minus"></i>
                                </div>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item nav-link" href="task.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-calendar2"></i></div>
                                        <div class="col">ToDo home</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="taskcalander.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-calendar-check"></i></div>
                                        <div class="col">Calendar Tasks</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="todaystask.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-calendar-date"></i></div>
                                        <div class="col">Today's Tasks</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="events.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-calendar-event"></i></div>
                                        <div class="col">Events</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>
                                <li><a class="dropdown-item nav-link" href="event-details.html">
                                        <div class="avatar avatar-40 rounded icon"><i class="bi bi-calendar2-day-fill"></i></div>
                                        <div class="col">Event Details</div>
                                        <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                                    </a></li>

                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="chat.html" tabindex="-1" aria-disabled="true">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-chat-text"></i></div>
                                <div class="col">Messages</div>
                                <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="notifications.html" tabindex="-1" aria-disabled="true">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-bell"></i></div>
                                <div class="col">Notification</div>
                                <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="settings.html" tabindex="-1" aria-disabled="true">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-gear"></i></div>
                                <div class="col">Settings</div>
                                <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="pages.html" tabindex="-1" aria-disabled="true">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-file-earmark-text"></i></div>
                                <div class="col">Pages</div>
                                <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="signin.html" tabindex="-1" aria-disabled="true">
                                <div class="avatar avatar-40 rounded icon"><i class="bi bi-box-arrow-right"></i></div>
                                <div class="col">Logout</div>
                                <div class="arrow"><i class="bi bi-arrow-right"></i></div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Sidebar main menu ends -->

</template>